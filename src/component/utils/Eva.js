import React from 'react';

export default ({ like, painting }) => {
  return (
    <div className="eva">
      <div className="eva-num">
        <label>
          {' '}
          <span role="img" aria-label="star">
            🤩
          </span>{' '}
          {like}
        </label>
      </div>
      <div className="eva-num">
        <label>
          <span role="img" aria-label="smile">
            🤨
          </span>
          {painting}
        </label>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Indie+Flower');

        .eva {
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-self: stretch;
        }
        
        .eva-num  {
            padding: 0;
            margin: 0;
            font-size: 1.5em;
            color: #663300;
            justify-self: start;
        }
        
        .eva-num > label {
            font-family: 'Indie Flower', cursive;
        }
  `}</style>
    </div>
  );
};
