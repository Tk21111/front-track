import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from './authSlice';
import {QRCodeSVG} from 'qrcode.react';

const GetUser = () => {
  const userId = useSelector(selectCurrentUserId);

  return (
    <div>
      <h2>User QR Code</h2>
      {userId ? <QRCodeSVG value={userId} size={300} /> : <p>No User ID Available</p>}
    </div>
  );
};

export default GetUser;
