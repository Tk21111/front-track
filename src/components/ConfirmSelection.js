import React, { useState } from "react";
import ReactDom from 'react-dom';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useCreateNoteMutation, useUpdateNoteMutation } from "../features/users/NoteApiSlice";
import { useCreatePostMutation } from "../features/post/PostApiSlice";
import { translate } from "../hooks/translator";

export default function ConfirmSelection({ link, open, onCloseConfirm, dataFood, imgPath , donate , name}) {
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const [createNote , {data , isLoading , isSuccess}] = useCreateNoteMutation();
    const [updateNote , {data: update , isLoading : loading}] = useUpdateNoteMutation();
    

    if (!open) {
        return null;
    }

    const sent = (dataFood, amount) => {

        

        const onSent = async (dataFood) => {


            try {
                const formData = new FormData();
                //backend and apiSlice require this cause it support multinote at once
                formData.append(`notes[0][username]`, name);
                formData.append(`notes[0][text]`, dataFood.text);
                formData.append(`notes[0][date]`, dataFood.timeOut);
                formData.append(`notes[0][count]`, amount);
                formData.append(`notes[0][countExp]`, 0);
                formData.append(`notes[0][tag]`, dataFood.tag);
                formData.append(`notes[0][typeCount]`, dataFood.typeCount || "");
                formData.append(`notes[0][donate]`, true);
                  
                await createNote({
                  formData,
                }).unwrap();

                
                
                const amountLeft = dataFood.count[dataFood.count.length - 1] - amount

                //countExp for consit data with count
                await updateNote({id : dataFood.id , count : amountLeft , countExp : dataFood.countExp[dataFood.countExp.length - 1], update: true }).unwrap()
                

                navigate(`/welcome`)

              } catch (err) {
                console.error("Failed to save the post", err);
                if (err.originalStatus === 409) {
                  navigate(`/user/note/edit/${err.data.noteId}`);
                } else if (err.name === "TypeError" && err.message === "Failed to fetch") {
                  console.error("Network or CORS error: ", err);
                } else {
                  console.error("Unexpected error: ", err);
                }
              }
        };
        const amountNum = parseFloat(amount);
        
        // Ensures amount is a valid number before proceeding
        if (isNaN(amountNum) || amountNum <= 0) {
            console.log("Please enter a valid amount");
            return;
        }

        const availableAmount = ((dataFood?.count[dataFood?.count.length -1 ] || 0) - (dataFood?.countExp[dataFood?.countExp.length -1 ] || 0));
        
        if (availableAmount - amountNum >= 0) {

            if(donate === 'false'){
                
               try{
                    navigate(`/location/create/${dataFood.id}/${amountNum}`);
               }catch (err){
                    console.log(err);
               }
            } else if (donate === 'true'){
                try{
                    onSent(dataFood);
                } catch (err){
                    console.log("Onsent" + err)
                }
            }
        } else {
            console.log("The amount you want to send exceeds the available amount.");
        }
    };

    return ReactDom.createPortal(
        <>
            <div style={{
                zIndex: 901,
            }} className="over-ray">
                <article style={{ backgroundColor: 'rgba(255, 255, 255, 1)', width: '90%' }}>
                    <img onClick={onCloseConfirm} src={require('../components/img/back.png')} alt="back" className="smalllogo" style={{ transform: 'translate(-50%)' }} />
                    
                    <div className="food-waste-item-sub" style={{ border: '0px' }}>
                        <div className="food-waste-details-confirm-selection">
                            <img src={imgPath || require('../components/img/meal.png')} className="smalllogo-vertical-fix" alt="home" />
                        </div>
                        <div className="food-waste-details-confirm-selection" style={{marginLeft : '10px'}}>
                            <h2>{translate("amount")}</h2>
                            <input
                                style={{ width: '95%' }}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}  // Ensure you update the state
                                placeholder="Amount..."
                            />
                        </div>
                    </div>

                    <div className="food-waste-item-sub" style={{ border: '0px'}}>
                        <div className="food-waste-details" style={{ textAlign: 'left', width: '20%', marginLeft: '-5%', marginRight: '50%' }}>
                            <p>{dataFood.text.substr(0, 10) + '\n' + ': ' + (dataFood.count[dataFood.count.length -1 ] - dataFood.countExp[dataFood.countExp.length - 1])}</p>
                        </div>
                        <div className="food-waste-details">
                            {<div onClick={() => sent(dataFood, amount)} style={{
                                border: '1px solid black',
                                backgroundColor: '#92F356',
                                borderRadius: '5px',
                                height: '50px',
                                width: '50px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <img src={require('../components/img/checkT.png')} alt="YES" style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }} />
                            </div>}
                        </div>
                    </div>
                </article>
            </div>
        </>,
        document.getElementById('portal')
    );
};
