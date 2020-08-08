import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../utils/Avatar';
import './Header.css';

export default ({ me, src }) => {
  return (
    <header className="Toolbar">
      <Avatar src={src} />
      <div className="nav">
        <Link to={{ pathname: '/profile/' + me }}>
          <p>{me}</p>
        </Link>
      </div>
      <div className="nav">
        <Link to="/upload">
          <p>Shining</p>
        </Link>
      </div>
    </header>
  );
};
