import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../utils/Avatar';
import './Header.css';

export default ({ me, src, balance }) => {
  return (
    <header style={{ justifyContent: 'space-between', display: 'flex' }}>
      <div>
        <img src="shinedme.png" style={{ width: '80px', height: '80px' }} />
      </div>
      <div className="Toolbar">
        <Avatar src={src} />
        <div style={{ marginLeft: '10px' }}>
          {balance && <p>Balance : {balance}</p>}
        </div>
        <div className="nav">
          <Link to={{ pathname: '/profile/' }}>
            <p>{me}</p>
          </Link>
        </div>
        <div className="nav">
          <Link to="/upload">
            <p>Shining</p>
          </Link>
        </div>
        <div className="nav">
          <Link to="/dash">
            <p>Home</p>
          </Link>
        </div>
      </div>
    </header>
  );
};
