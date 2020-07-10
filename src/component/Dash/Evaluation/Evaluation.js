import React from 'react';
import './Evaluation.css';

export default () => {
  const likeCurrentPhoto = () => {};
  const openBoard = () => {};
  return (
    <div className="home-eva">
      <div className="emoji first" onClick={likeCurrentPhoto}>
        <p>
          Like it!{' '}
          <span role="img" aria-label="star">
            🤩
          </span>{' '}
        </p>
      </div>
      <div className="emoji second" onClick={openBoard}>
        <p>
          Let's change it!{' '}
          <span role="img" aria-label="smile">
            🤨
          </span>{' '}
        </p>
      </div>
    </div>
  );
};
