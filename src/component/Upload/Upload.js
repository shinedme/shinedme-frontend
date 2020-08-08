import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import { RiUploadCloud2Line } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPersonBoundingBox } from 'react-icons/bs';
import './Upload.css';

export default () => {
  const { saveToIpfs, signer, upload, saveUrl, created_name } = useSubstrate();
  const hiddenFileInput = useRef(null);
  const [status, setStatus] = useState('');

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    saveToIpfs(event.target.files, 'PHOTO');
  };

  const openFile = () => {
    hiddenFileInput.current.click();
  };

  const changeUrl = (event) => {
    saveUrl(event.target.value);
  };

  const validateUrl = (url) => {
    const expression = /^(http(?:s)?\:\/\/[a-zA-Z0-9]+(?:(?:\.|\-)[a-zA-Z0-9]+)+(?:\:\d+)?(?:\/[\w\-]+)*(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/gi;
    const regex = new RegExp(expression);
    if (url.match(regex) || url === '') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="upload">
      <div style={{ textAlign: 'right' }}>
        <Link to="/dash">
          <AiOutlineHome className="close" />
        </Link>
        <Link to={{ pathname: '/profile/' + created_name }}>
          <BsPersonBoundingBox className="close" />
        </Link>
      </div>
      <div className="upload-img">
        <div className="img-preview">
          <img src={upload.photo} alt="" />
        </div>
      </div>
      <div>
        <label>Link to buy:</label>
        <input
          type="text"
          name="url"
          id="url"
          onChange={changeUrl}
          placeholder="optional"
        />
      </div>
      <div>
        <button
          className="shined-me"
          style={{ marginRight: '50px' }}
          onClick={openFile}
        >
          <div className="arrow-link">
            <RiUploadCloud2Line className="arrow-up" />
            Post
          </div>
          <input
            id="imageInput"
            type="file"
            ref={hiddenFileInput}
            onChange={captureFile}
            style={{ display: 'none' }}
          />
        </button>
        {signer ? (
          <TxButton
            accountPair={signer}
            label={'😇 Upload'}
            setStatus={setStatus}
            type="SIGNED-TX"
            disabled={!upload.photo || !validateUrl(upload.affiliate_url)}
            attrs={{
              palletRpc: 'erc20',
              callable: 'uploadPhoto',
              inputParams: [upload.photo, upload.affiliate_url],
              paramFields: [true, { optional: true }],
            }}
            style={{ fontSize: '1.5rem' }}
          />
        ) : null}
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </div>
    </div>
  );
};
