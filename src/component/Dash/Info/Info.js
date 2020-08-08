import React from 'react';
import './Info.css';

export default ({ Open, previous, next, index, len }) => {
  return (
    <div className="home-me">
      <button className="next" onClick={previous} disabled={index === 0}>
        PREVIOUS
      </button>
      <button className="next" onClick={next} disabled={index === len - 1}>
        NEXT
      </button>
      <button className="shined-me" onClick={Open}>
        changed style
      </button>
    </div>
  );
};
