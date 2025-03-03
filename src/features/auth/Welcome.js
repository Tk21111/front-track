import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Header from '../../components/Header';
import { translate } from '../../hooks/translator';
import { useImgMutation } from './authApiSlice';

const ImageUpload = () => {
  const [sendImg, { data, isLoading, isSuccess }] = useImgMutation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

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
      setMessage("Error uploading image.");
    }
  };



  const prediction = data?.predictions?.[0].class;
  const predictionPicture = [
    {
      color: 'orange',
      text: 'สีเหลือง',
      src: require('../../components/img/gogo.png'),
    },
    {
      color: 'blue',
      text: 'สีฟ้า',
      src: require('../../components/img/lala.png'),
    },
  ];

  // Ensure prediction is a valid index
  const predictOutput =  predictionPicture[prediction] || null;
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
        <h1>{translate("pretext-welcome")}</h1>
        <h1 style={{ marginBottom: '20px' }}>Upload Image</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', gap: '20px' }}>
          <input type="file" className="buttonCF" onChange={handleFileChange} accept="image/*" />
          <button type="submit" className="buttonCF">Upload</button>
        </form>
        {preview && (
          <div>
            <h3>Preview:</h3>
            <img src={preview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
          </div>
        )}

        {/* Conditional rendering based on prediction */}
        {predictOutput && (
          <div>
            <h2 style={{ color: predictOutput.color }}>{predictOutput.text}</h2>
            <img src={predictOutput.src} alt="predict-image" />
          </div>
        )}

      </div>
    </div>
  );
};

export default ImageUpload;
