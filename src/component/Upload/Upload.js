import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import { RiUploadCloud2Line } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import './Upload.css';

export default () => {
  const { saveToIpfs, photo, signer, affiliate_url, saveUrl } = useSubstrate();
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
        <label>Link to buy:</label>
        <input type="text" name="url" id="url" onChange={changeUrl} />
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
            attrs={{
              palletRpc: 'erc20',
              callable: 'updateUser',
              inputParams: [photo, affiliate_url],
              paramFields: [true, { optional: true }],
            }}
          />
        ) : null}

        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </div>
    </div>
  );
};
