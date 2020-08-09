import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { Link } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';

import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import { RiUploadCloud2Line } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeopleCircle } from 'react-icons/bs';
import './Upload.css';

const pixelRatio = 4;

export default () => {
  const { saveToIpfs, signer, upload, saveUrl, created_name } = useSubstrate();
  const hiddenFileInput = useRef(null);
  const [status, setStatus] = useState('');

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

  //crop part
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    document.querySelector('#canvas').toBlob(function (blob) {
      console.log(blob);
      let file = new File([blob], 'selected.png');
      saveToIpfs([file], 'PHOTO');
    });
  }, [completedCrop, saveToIpfs]);

  console.log(upload);

  return (
    <div
      style={{
        marginTop: '110px',
        overflowY: 'scroll',
        height: 'calc(100vh - 110px)',
      }}
    >
      <div style={{ position: 'absolute', top: '120px', right: '50px' }}>
        <Link to="/dash">
          <AiOutlineHome className="close" />
        </Link>
        <Link to={{ pathname: '/profile/' + created_name }}>
          <BsPeopleCircle className="close" />
        </Link>
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
            onChange={onSelectFile}
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
      <div style={{ marginBottom: '10px' }}>
        <label>Link to buy : </label>
        <input
          type="text"
          name="url"
          id="url"
          onChange={changeUrl}
          placeholder="optional"
        />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        className="upload-img"
      />
      <canvas
        ref={previewCanvasRef}
        style={{
          width: completedCrop?.width ?? 0,
          height: completedCrop?.height ?? 0,
        }}
        id="canvas"
      />
    </div>
  );
};
