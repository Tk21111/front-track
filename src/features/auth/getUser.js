import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentUserId } from './authSlice';
import {QRCodeSVG} from 'qrcode.react';
import Header from '../../components/Header';

const GetUser = () => {
  const userId = useSelector(selectCurrentUserId);
  const user = useSelector(selectCurrentUser);

  return (
    <div className='page' style={{display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
      <Header/>
      <div style={{marginTop : '10vi' , display : 'flex' , flexDirection : 'column' , alignItems : 'center'}}>
        <div className='circle' style={{height: '200px' , width: '200px' , backgroundColor : 'whitesmoke' , borderColor : 'gray' ,boxShadow : '2px 3px 1px 4px black'}}>
        <div className='circle' style={{height: '180px' , width: '180px' , backgroundColor : '#B0E7FF' , borderColor : 'gray'}}></div>
        </div>
          <div style={{display : 'flex' , flexDirection : 'column' , alignItems : 'center' , margin : '10vi 0vi 10vi 0vi'}}>
            <h2>{"username : " + user}</h2>
            <h2 style={{fontSize: "60%"}}>{"userId : " + userId}</h2>
          </div>
        <h2>User QR Code</h2>
        {userId ? <QRCodeSVG value={userId} size={300} /> : <p>No User ID Available</p>}
      </div>
     
    </div>
  );
};

export default GetUser;
