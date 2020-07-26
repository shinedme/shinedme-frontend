import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default ({ me }) => {
  return (
    <header className="Toolbar">
      <div className="nav">
        <Link to={{ pathname: '/profile/' + me }}>{me}</Link>
      </div>
      <div className="nav">
        <Link to="/upload">Shining</Link>
      </div>
    </header>
  );
};
