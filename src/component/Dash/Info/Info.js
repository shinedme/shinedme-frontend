import React from 'react';
import { Link } from 'react-router-dom';
import './Info.css';

export default () => {
  const nextPhoto = () => {
    console.log('clicked');
  };
  const me = 'Me';
  return (
    <div className="home-me">
      <button className="next" onClick={nextPhoto}>
        NEXT
      </button>
      <button className="next">
        <Link to={`/profile/${me}`}>{me}</Link>
      </button>
      <button className="shined-me">
        <Link to="/upload">SHINED</Link>
      </button>
    </div>
  );
};
