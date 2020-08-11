import React from 'react';
import Modal from '../utils/Modal';

export default ({ show, Close, photoUrl }) => {
  return (
    <Modal show={show} Close={Close} className="upload">
      <img
        style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '600px', margin: '30px auto' }}
        src={photoUrl}
        alt=""
      />
    </Modal>
  );
};
