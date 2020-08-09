import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import { AiOutlineHome } from 'react-icons/ai';
import './Editor.css';
/* global cv */

export default () => {
  const { saveToIpfs, signer, upload } = useSubstrate();
  const photo = 'photo';
  const [status, setStatus] = useState('');
  let [from, setFrom] = useState('#000000');
  let [to, setTo] = useState('#ffffff');
  let [range, setRange] = useState('10');

  function setFromColor(e2) {
    let e = e2.nativeEvent;
    let x, y;
    //chrome
    if (e.offsetX) {
      x = e.offsetX;
      y = e.offsetY;
    }
    // firefox
    else if (e.layerX) {
      x = e.layerX;
      y = e.layerY;
    }
    console.log(x, y);
    setCanvas(
      document.querySelector('#cs'),
      document.querySelector('#photo'),
      () => { }
    );
    var p = document
      .querySelector('#cs')
      .getContext('2d')
      .getImageData(x, y, 1, 1).data;
    console.log(p);
    setFrom(rgbToHex(p[0], p[1], p[2]));
  }

  function setToColor(e) {
    setTo(e.target.value);
  }

  function setColorRange(e) {
    console.log(e.target.value);
    setRange(e.target.value);
  }

  function changeColor() {
    // setCanvas(document.querySelector("#cs"), document.querySelector("#photo"), () => { })

    let src = cv.imread('cs');
    let hsv = new cv.Mat();
    cv.cvtColor(src, hsv, cv.COLOR_BGR2HSV, 0);
    let s = rgb2hsv(...hex2rgb(from));
    let t = rgb2hsv(...hex2rgb(to));
    console.log(s);
    let zero_color = [0, 0, 0, 0];
    let one_color = [180, 255, 255, 255];
    let delta = Number(range);
    let low_color = [...colorBound(s, [-delta, -255, -255]), 0];
    let high_color = [...colorBound(s, [delta, 255, 255]), 255];
    console.log(low_color);
    console.log(high_color);

    let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), low_color);
    let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), high_color);
    let zero = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), zero_color);
    let one = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), one_color);

    let r = new cv.Mat();

    let mask1 = new cv.Mat();
    let mask2 = new cv.Mat();
    if (low_color[0] > high_color[0]) {
      console.log('aaa');
      cv.inRange(hsv, zero, high, mask1);
      let mask2 = new cv.Mat();
      cv.inRange(hsv, low, one, mask2);
      cv.bitwise_or(mask1, mask2, mask1);
    } else {
      cv.inRange(hsv, low, high, mask1);
    }

    let classifier = new cv.CascadeClassifier();
    classifier.load('haarcascade_frontalface_default.xml');
    console.log('aa');
    let gray = new cv.Mat();
    let faces = new cv.RectVector();
    cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY, 0);
    classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
    console.log(faces);
    console.log(faces.size());
    for (let i = 0; i < faces.size(); ++i) {
      let face = faces.get(i);
      console.log(face.x, face.y);
      let roi = mask1.roi(new cv.Rect(face.x, face.y, face.width, face.height));

      for (let k = 0; k < roi.rows; k++) {
        for (let j = 0; j < roi.cols; j++) {
          console.log(mask1.ucharPtr(face.height + k, face.width + j)[0]);
          mask1.ucharPtr(face.y + k, face.x + j)[0] = 0;
        }
      }
      // let roi_inv = new cv.Mat()
      // cv.bitwise_not(roi, roi_inv);
      // cv.bitwise_and(mask1, roi_inv, mask1)
      // cv.bitwise(r, point1, point2, [255, 0, 0, 255]);
    }

    cv.bitwise_not(mask1, mask2);
    // cv.inRange(hsv, [170, 120, 70], [180, 255, 255], mask2)
    let diff = t[0] - s[0];
    if (diff < 0) {
      diff += 180;
    }

    let adjust = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [diff, 0, 0, 255]);
    cv.add(hsv, adjust, r, mask1);
    // cv.bitwise_or(hsv, hsv, r, mask1);
    cv.bitwise_or(hsv, hsv, r, mask2);
    cv.cvtColor(r, r, cv.COLOR_HSV2BGR, 0);

    cv.imshow('cs2', r);

    document.querySelector('#cs2').toBlob(function (blob) {
      console.log(blob);
      let file = new File([blob], 'modified.png');
      saveToIpfs([file], 'PHOTO');
    });
  }

  useEffect(() => {
    setCanvas(
      document.querySelector('#cs'),
      document.querySelector('#photo'),
      () => { }
    );
  }, []);

  return (
    <div
      style={{
        marginTop: '110px',
        overflowY: 'scroll',
        height: 'calc(100vh - 110px)',
      }}
    >
      <div style={{ position: 'absolute', top: '150px;', right: '50px' }}>
        <Link to="/dash">
          <AiOutlineHome className="close" />
        </Link>
      </div>
      <img
        src="https://gateway.ipfs.io/ipfs/QmNn3N1d1JB6RBXiEdsqoENViDELjX1CU8nzrM93mH9sPa"
        crossOrigin="anonymous"
        id="photo"
        onClick={setFromColor}
        alt=""
      />
      <canvas id="cs2"></canvas>
      <canvas id="cs"></canvas>
      <div className="control">
        <div className="colorpicker">
          <div>
            <p className="icon-title">Selected</p>
            <p className="icon-text">{from}</p>
          </div>
          <label>
            <div
              id="from"
              style={{ backgroundColor: from }}
              className="result"
            ></div>
          </label>
        </div>
        <div className="colorpicker">
          <div>
            <p className="icon-title">Color</p>
            <p className="icon-text">{to}</p>
          </div>
          <label>
            <div className="result" style={{ backgroundColor: to }}>
              <input
                type="color"
                id="to"
                value={to}
                onChange={setToColor}
                style={{
                  display: 'none',
                }}
              />
            </div>
          </label>
        </div>
        <div className="colorpicker">
          <div>
            <p className="icon-title">Range</p>
            <p className="icon-text">{range}</p>
          </div>
          <label>
            <input
              type="range"
              onChange={setColorRange}
              min="1"
              max="20"
              value={range}
              style={{ marginTop: '20px' }}
            />
          </label>
        </div>
        <div className="colorpicker">
          <label>
            <button onClick={changeColor} className="shined-me">
              change
            </button>
          </label>
        </div>
        <div className="colorpicker">
          <label>
            {signer ? (
              <TxButton
                accountPair={signer}
                label={'save'}
                labelDone={'saved'}
                setStatus={setStatus}
                type="SIGNED-TX"
                attrs={{
                  palletRpc: 'erc20',
                  callable: 'editPhoto',
                  inputParams: [photo, upload.photo],
                  paramFields: [true, true],
                }}
                style={{ fontSize: '1.5rem' }}
              />
            ) : null}
          </label>
        </div>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </div>
    </div>
  );
};

function rgb2hsv(b, g, r) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs);
  diff = v - Math.min(rabs, gabs, babs);
  diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num) => Math.round(num * 100) / 100;
  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [
    Math.round(h * 180),
    percentRoundFn(s * 255),
    percentRoundFn(v * 255),
  ];
}

function colorBound(hsv, delta) {
  return [
    Math.floor(hsv[0] + delta[0]) % 180,
    Math.min(Math.max(0, hsv[1] + delta[1]), 255),
    Math.min(Math.max(0, hsv[2] + delta[2]), 255),
  ];
}

function hex2rgb(hex) {
  return [
    ('0x' + hex[1] + hex[2]) | 0,
    ('0x' + hex[3] + hex[4]) | 0,
    ('0x' + hex[5] + hex[6]) | 0,
  ];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function setCanvas(el, image, callback) {
  el.width = image.width; // img width
  el.height = image.height; // img height
  // draw image in canvas tag
  el.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
  return callback();
}

function createFileFromUrl(path, url, callback) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function (ev) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let data = new Uint8Array(request.response);
        cv.FS_createDataFile('/', path, data, true, false, false);
        callback();
      } else {
        console.log('Failed to load ' + url + ' status: ' + request.status);
      }
    }
  };
  request.send();
}

createFileFromUrl(
  'haarcascade_frontalface_default.xml',
  'haarcascade_frontalface_default.xml',
  () => { }
);
