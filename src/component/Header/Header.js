import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../utils/Avatar';
import './Header.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeopleCircle } from 'react-icons/bs';

export default ({ me, src }) => {
  return (
    <header className="Toolbar">
      <Avatar src={src} />
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
          <p><AiOutlineHome /></p>
        </Link>
      </div>
    </header>
  );
};
