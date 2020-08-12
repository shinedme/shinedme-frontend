import React from 'react';

export default ({ src }) => {
  return (
    <img
      src={src}
      alt=""
      style={{
        width: '70px',
        height: '70px',
        borderRadius: '10px',
        border: '1px dashed #FFFF00',
      }}
    />
  );
};
