import React from 'react';

export default ({ link }) => {
  const src = 'https://ipfs.io/ipfs/' + link;
  return (
    <img
      src={src}
      alt=""
      style={{
        width: '70px',
        height: '70px',
      }}
    />
  );
};
