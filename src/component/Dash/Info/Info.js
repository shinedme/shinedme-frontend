import React from 'react';
import './Info.css';

export default ({ Open }) => {
  const nextPhoto = () => {
    console.log('next photo');
  };
  const prevPhoto = () => {
    console.log('previous photo');
  };
  return (
    <div className="home-me">
      <button className="next" onClick={prevPhoto}>
        PREVIOUS
      </button>
      <button className="next" onClick={nextPhoto}>
        NEXT
      </button>
      <button className="shined-me">outfit links</button>
      <button className="shined-me" onClick={Open}>
        changed style
      </button>
    </div>
  );
};
