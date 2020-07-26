import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoginContext } from '../../context/useLogin';

import Avatar from '../utils/Avatar';
import './landing.css';
import { AiOutlineHome } from 'react-icons/ai';

export default () => {
  const useLogin = useContext(LoginContext);
  const { saveNickname, saveToIpfs, added_file_hash } = useLogin;

  const changeNickname = (event) => {
    saveNickname(event.target.value);
  };

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    saveToIpfs(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login account">
      <div className="log-in">
        <Link to="/dash">
          <AiOutlineHome className="close" />
        </Link>
        <form id="capture-media" onSubmit={handleSubmit}>
          {added_file_hash && <Avatar link={added_file_hash} />}
          <input
            type="file"
            name="input-file"
            id="input-file"
            onChange={captureFile}
          />
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={changeNickname}
          />
          <br />
          <div className="text-log">
            <button className="log-button">Create new account</button>
          </div>
        </form>
      </div>
    </div>
  );
};
