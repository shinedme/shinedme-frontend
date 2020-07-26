import React from 'react';
import Modal from '../../utils/Modal';
import Card from '../../Card/Card';

import Photo from '../../../assets/test.jpg';

export default ({ show, Close }) => {
  const paintings = [
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
  ];
  return (
    <Modal show={show} Close={Close}>
      <div className="profile-list">
        {paintings.length > 0
          ? paintings.map((p, index) => {
              return <Card photoUrl={p.photoUrl} key={index} />;
            })
          : null}
      </div>
    </Modal>
  );
};
