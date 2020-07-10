import React from 'react';
import { Link } from 'react-router-dom';
import './Upload.css';

// selectedFile && selectedFile.src != ''
export default () => {
  const openFile = () => {};
  const processFile = (imageInput) => {};
  const uploadImage = () => {};
  return (
    <div className="upload">
      <Link className="close" to="/dash">
        <i className="far fa-times-circle"></i>
      </Link>
      <alert></alert>
      <div className="upload-img">
        <img className="img-preview" src="{{selectedFile.src}}" alt="" />
        <div className="arrow" onClick={openFile}>
          <div className="arrow-link btn-file-input">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={processFile}
          style={{ display: 'none' }}
        />
        <p className="upload-text">Press or Drag & Drop to Upload</p>
      </div>
      <button type="submit" className="submit" onClick={uploadImage}>
        POST
      </button>
    </div>
  );
};
