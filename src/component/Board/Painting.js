import React from 'react';
import Modal from '../utils/Modal';

export default ({ show, Close, photoUrl }) => {
  return (
    <Modal show={show} Close={Close}>
      <img
        style={{ width: '100%', height: '100%', maxWidth: '400px' }}
        src={photoUrl}
        alt=""
      />
      <div></div>
    </Modal>
  );
};
