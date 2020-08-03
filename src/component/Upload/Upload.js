import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSubstrate } from '../../substrate-lib';

import { RiUploadCloud2Line } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import './Upload.css';

export default () => {
  const { saveToIpfs, photo } = useSubstrate();

  const hiddenFileInput = useRef(null);

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    saveToIpfs(event.target.files, 'PHOTO');
  };

  const openFile = () => {
    hiddenFileInput.current.click();
  };

  const uploadImage = () => {};
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
            ref={hiddenFileInput}
            onChange={captureFile}
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
