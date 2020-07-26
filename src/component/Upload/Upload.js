import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import './Upload.css';

// selectedFile && selectedFile.src != ''
export default () => {
  const [photo, dispatchPhoto] = useState(null);
  const [file, dispatchFile] = useState('');
  const hiddenFileInput = useRef(null);
  const openFile = () => {
    hiddenFileInput.current.click();
  };
  const processFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      dispatchFile(file);
      dispatchPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const uploadImage = () => {};
  // const alertMessage = 'Not upload successfully';
  return (
    <div className="upload">
      <Link to="/dash">
        <AiOutlineHome className="close" />
      </Link>
      <div className="upload-img">
        <div className="img-preview">
          <img src={photo} alt="" />
        </div>
      </div>
      <div>
        <button className="arrow" onClick={openFile}>
          <div className="arrow-link">
            <RiUploadCloud2Line className="arrow-up" />
          </div>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={(e) => processFile(e)}
            style={{ display: 'none' }}
          />
        </button>
        <button type="submit" className="arrow" onClick={uploadImage}>
          POST
        </button>
      </div>
    </div>
  );
};
