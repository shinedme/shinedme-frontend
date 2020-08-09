import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';

import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FiUploadCloud } from 'react-icons/fi';
import './Profile.css';

import Card from '../Card/Card';
import Avatar from '../utils/Avatar';
import Board from '../Board/Board';

export default () => {
  const { account } = useSubstrate();
  const { created_name, created_avatar, selfies } = account;

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');
  const open = (p) => {
    setShow(true);
    setUrl(p);
  };
  const close = () => setShow(false);

  return (
    <div className="profile">
      <div className="profile-up">
        <div style={{ marginTop: '20px' }}>
          <Avatar src={created_avatar} />
        </div>

        <div className="profile-info">
          <div className="name">
            <h2>*Name: {created_name}</h2>
            <h2 style={{ marginLeft: '20px' }}>*Post: {selfies.length}</h2>
          </div>
        </div>

        <div className="back">
          <Link to="/dash">
            <AiOutlineHome className="close" />
          </Link>
          <Link to="/upload">
            <FiUploadCloud className="close" />
          </Link>
        </div>
      </div>

      <div className="profile-list">
        {selfies ? (
          selfies.length > 0 ? (
            selfies.map((p, index) => {
              return <Card photoUrl={p} key={index} open={open} />;
            })
          ) : (
            <p className="nophoto">
              You don't have post anything yet.{' '}
              <Link to="/upload">Upload </Link>?
            </p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Board show={show} Close={close} photoUrl={url} />
    </div>
  );
};
