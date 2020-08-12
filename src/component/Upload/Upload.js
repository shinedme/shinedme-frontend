import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import { RiUploadCloud2Line } from 'react-icons/ri';
import './Upload.css';

const pixelRatio = 4;

export default () => {
  const { saveToIpfs, signer, upload, saveUrl } = useSubstrate();

  const hiddenFileInput = useRef(null);
  const [status, setStatus] = useState('');

  const openFile = () => {
    hiddenFileInput.current.click();
  };

  const changeUrl = (event) => {
    saveUrl(event.target.value);
  };

  const validateUrl = (url) => {
    const expression = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/i;
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
    console.log(image.width);
    console.log(image.height);
    console.log(crop.width);
    console.log(crop.height);

    if (crop.width <= 0) {
      crop.x = crop.x + crop.width;
      crop.width = -crop.width;
    }
    if (crop.height <= 0) {
      crop.y = crop.y + crop.height;
      crop.height = -crop.height;
    }
    if (crop.width < 30 || crop.height < 40) {
      crop.width = 30;
      crop.height = 40;
    }

    if (crop.height > (4 / 3) * crop.width) {
      crop.height = (4 / 3) * crop.width;
    } else if (crop.height < (4 / 3) * crop.width) {
      crop.width = (3 / 4) * crop.height;
    }

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
      <div>
        <button
          className="shined-me"
          style={{ marginRight: '50px' }}
          onClick={openFile}
        >
          <div className="arrow-link">
            <RiUploadCloud2Line /> Select an Image
          </div>
          <input
            id="imageInput"
            type="file"
            ref={hiddenFileInput}
            onChange={onSelectFile}
            style={{ display: 'none' }}
          />
        </button>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '1.5rem' }}>Affiliate Url : </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={changeUrl}
            placeholder="optional"
            style={{ fontSize: '1.5rem', width: '20rem' }}
          />
        </div>
        {signer ? (
          <TxButton
            accountPair={signer}
            label={'😇 Post'}
            labelDone={'😇 Posted'}
            setStatus={setStatus}
            type="SIGNED-TX"
            disabled={!upload.photo || !validateUrl(upload.affiliate_url)}
            attrs={{
              palletRpc: 'erc20',
              callable: 'uploadPhoto',
              inputParams: [upload.photo, upload.affiliate_url],
              paramFields: [true, { optional: true }],
            }}
          />
        ) : null}
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
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
