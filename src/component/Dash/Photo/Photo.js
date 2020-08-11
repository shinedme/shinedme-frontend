/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './Photo.css';

export default ({ src, affUrl }) => {
  console.log(affUrl);
  return (
    <div className="wrapper">
      <div className="home-img">
        {affUrl ? <a href={affUrl} style={{ cursor: 'pointer' }} target="_blank">
          <img
            src={src}
            alt="Oops! NO more photos available, please upload your own and join with shined me community"
            className="img-set"
          />
        </a> :
          <img
            src={src}
            alt="Oops! NO more photos available, please upload your own and join with shined me community"
            className="img-set"
          />}
      </div>
    </div>
  );
};
