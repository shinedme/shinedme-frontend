/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './Photo.css';

export default ({ src }) => {
  return (
    <div className="home-img">
      <img
        src={src}
        alt="Oops! NO more photos available, please upload your own and join with shined me community"
        className="img-set"
      />
    </div>
  );
};
