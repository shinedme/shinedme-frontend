import React from 'react';
import './Evaluation.css';

export default () => {
  const likeCurrentPhoto = () => {
    console.log('like');
  };
  const openBoard = () => {
    console.log('open bloard');
  };
  const sendComment = () => {
    console.log('send comments');
  };
  return (
    <div className="home-eva">
      <div className="emoji first" onClick={likeCurrentPhoto}>
        <p>
          Like it!
          <span role="img" aria-label="star">
            🥳
          </span>{' '}
        </p>
      </div>
      <div className="emoji second" onClick={openBoard}>
        <p>
          Change Style
          <span role="img" aria-label="smile">
            🤩
          </span>{' '}
        </p>
      </div>

      <div class="home-comment">
        <textarea
          rows="4"
          cols="40"
          placeholder="What do you think could be better?"
          maxlength="500"
          id="content"
        ></textarea>
        <button class="submit" onClick={sendComment}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};
