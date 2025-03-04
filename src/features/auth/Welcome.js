import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Header from '../../components/Header';
import { translate } from '../../hooks/translator';
import { useImgMutation } from './authApiSlice';
import { Slider } from '@mui/material';

const ImageUpload = () => {
  const [sendImg, { data, isLoading, isSuccess }] = useImgMutation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [confidenceSelect , SetConfidenceSelect ] = useState(0.7);

  //test sample data
  /*
  const data = {
    "inference_id": "36c4e003-1973-4e14-a280-b74e084df37a",
    "time": 0.05830865099960647,
    "image": {
        "width": 1125,
        "height": 2000
    },
    "predictions": [
        {
            "x": 659.5,
            "y": 991.5,
            "width": 817,
            "height": 1329,
            "confidence": 0.8866305947303772,
            "class": "0",
            "class_id": 1,
            "detection_id": "7cdbeec4-fb2e-4ddb-8bb4-d461f7b644cf"
        },
        {
            "x": 659.5,
            "y": 991.5,
            "width": 817,
            "height": 1329,
            "confidence": 0.5,
            "class": "0",
            "class_id": 3,
            "detection_id": "7cdbeec4-fb2e-4ddb-8bb4-d461f7b644cf"
        }
    ]
  }
    */
  

  // Handle the change event for file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle the form submission to upload the image
  
  const handleSubmit = async (e) => {
    setMessage("")
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await sendImg({formData}).unwrap();
    } catch (error) {
      console.log(error)
      if(error.data.err === 413){
        setMessage("Image too Large")
      } else {
        setMessage("Error uploading image.");
      }
    }
  };
  


  const predictionPicture = [
    {
      //เลย์ lay  0
      color: '#f0e446',
      text: 'สีเหลือง',
      src: require('../../components/img/lay.png'),
    },
    {
      //lactasoy 1
      color: 'blue',
      text: 'สีฟ้า',
      src: require('../../components/img/lala.png'),
    },
    {
      //โก๋แก่ gogo 2
      color: 'orange',
      text: 'สีส้ม',
      src: require('../../components/img/gogo.png'),
    },
    {
      //ช้อคแลตตาซอย cl 3
      color: '#bd6d3e',
      text: 'สีนํ้าตาลขาว',
      src: require('../../components/img/lala-choco.png'),
    },
    {
       //เจลลี่แบร์ jb 4
      color: '#ffbb1c',
      text: 'สีทอง',
      src: require('../../components/img/jb.png'),
    },
    {
      //หมึกกรุบ mk 5
      color: '#cf483e',
      text: 'สีแดง',
      src: require('../../components/img/mk.png'),
    },
    {
      //m&m mm 6
      color: '#85170d',
      text: 'สีนํ้าตาล',
      src: require('../../components/img/mm.png'),
    },{
      color : 'red',
      text : 'Not Match',
      src: require('../../components/img/not-match.png'),
    }
  ];
  let prediction;

  if(data){
    if(data.predictions.length > 1){
      let sort = data.predictions.map(val => val.confidence);
      let maxConfidence = sort.reduce((prev , curr) => {
        return curr > prev ? curr : prev
      });
      prediction = data.predictions.find(val => val.confidence === maxConfidence);
    } else {
      prediction = data.predictions[0]
    }
    prediction =  prediction.confidence > confidenceSelect && isSuccess ? prediction.class_id : predictionPicture.length - 1;
  }

  

  // set data to predictOutput format
  const predictOutput =  predictionPicture[prediction] ;
  //debug
  console.log(data)



  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Header />
      <div
        style={{
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px', // Adds space between child elements
        }}
      >
        {message ? <h1 style={{color : 'red'}}>{message}</h1> : null}
        <h1 style={{fontSize : '30px'}}>{translate("pretext-welcome")}</h1>
        {/* Conditional rendering based on prediction */}
        {
          isLoading && !isSuccess ? <p>Loading</p> : null 
        }
        {predictOutput && (
          <div>
            <h2 style={{ color: predictOutput.color }}>{predictOutput.text}</h2>
            <img src={predictOutput.src} className='img-prediction' alt="predict-image" />
          </div>
        )}
        
        <h1 style={{ marginBottom: '20px' }}>Upload Image</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', gap: '20px' }}>
          <input type="file" className="buttonCF" onChange={handleFileChange} accept="image/*" />
          <p>{"confidence : " + confidenceSelect}</p>
          <input 
            type="range" 
            min={0.1} 
            max={1} 
            id="range" 
            value={confidenceSelect} 
            onChange={(e) => SetConfidenceSelect(parseFloat(e.target.value))}
            step={0.01}
          />
          <button type="submit" className="buttonCF">Upload</button>
        </form>
        {preview && (
          <div>
            <h3>Preview:</h3>
            <img src={preview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
