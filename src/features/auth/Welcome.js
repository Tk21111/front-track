import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentScore, selectCurrentToken, selectCurrentUser, selectCurrentUserId } from './authSlice';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageType, setImageType] = useState(null); // New state to track the type

  const userId = useSelector(selectCurrentUserId);
  const score = useSelector(selectCurrentScore);
  const username = useSelector(selectCurrentUser);

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
    formData.append('type', imageType); // Append the selected type

    try {
      const response = await fetch('http://localhost:3500/img', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        setMessage(data.type);
        setUploadedImage(`http://localhost:3500${data.filePath}`);
      } else {
        setMessage("Failed to upload image.");
      }
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  // Handle type button click (true or false)
  const handleTypeChange = (type) => {
    setImageType(type);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h1>{"username : " + username || null}</h1>
      <h1 style={{ marginBottom: '20px' }}>Upload Image</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <p>{score || 0} : score</p>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}

      

      {/* Link to GetUser Component */}
      <Link to="/getuser" style={{ marginTop: '20px', textDecoration: 'none', color: 'blue' }}>
        Go to User
      </Link>

      {/* Conditional rendering based on the message */}
      {message === "" ? null : (
        message === "gogo" ? (
          <div>
            <p style={{ color: "orange" }}>{"ทิ้งถังขยะสีเหลือง"}</p>
            <img src={require('../../components/img/gogo.png')} alt="gogo" style={{ width: '200px', height: 'auto' }} />
          </div>
        ) : (
          <div>
            <p style={{ color: "blue" }}>{"ทิ้งถังขยะสีฟ้า"}</p>
            <img src={require('../../components/img/lala.png')} alt="gogo" style={{ width: '200px', height: 'auto' }} />
          </div>
          
        )
      )}

      {/* Type selection buttons */}
      <div>
        <button onClick={() => handleTypeChange(true)}>gg</button>
        <button onClick={() => handleTypeChange(false)}>lactasoy</button>
      </div>
      
    </div>
  );
};

export default ImageUpload;
