import React from 'react';
// make this one photo list display
export default () => {
  const currentPhotoUrl = '';
  return (
    <div className="home-img">
      <img
        src={currentPhotoUrl}
        alt="Oops! Something wrong happened"
        className="img-set"
      />
    </div>
  );
};
