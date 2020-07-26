/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './Photo.css';

import Photo from '../../../assets/test.jpg';

export default () => {
  const currentPhotoUrl = '';
  return (
    <div className="home-img">
      <img
        src={currentPhotoUrl}
        alt="Oops! No photo available now, please wait or refresh"
        className="img-set"
      />
    </div>
  );
};
