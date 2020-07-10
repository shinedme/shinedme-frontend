import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
// interface Username && password {
//   valid:boolean;
//   dirty:boolean;
//   touched: boolean;
// }
export default () => {
  let forgetPasswordInfo;
  const showForget = () => {
    forgetPasswordInfo = 'Forgot Password ?';
  };
  const showThink = () => {
    forgetPasswordInfo = 'Think more! You can recall it!!!';
  };
  const login = () => {};
  return (
    <div className="login account">
      <div className="log-in">
        <Link className="close" routerLink="/">
          <i className="far fa-times-circle"></i>
        </Link>
        <alert></alert>
        <h3>LOG IN :</h3>
        <form className="login-account" method="GET" onSubmit={login}>
          <div className="text-log">
            <label className="label" for="id">
              <i className="fas fa-user-circle"></i>
            </label>
            <input
              className="info"
              type="text"
              name="username"
              placeholder="Enter your Username"
              required
              pattern="\S+"
              minlength="8"
            />
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
            <p className="hint">Invalid Username</p>
          </div>
          <div className="text-log">
            <label className="label" for="pass">
              <i className="fas fa-unlock"></i>
            </label>
            <input
              className="info"
              type="password"
              name="userpass"
              placeholder="Enter your Password"
              required
              pattern="\S+"
              minlength="8"
            />
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
            <p className="hint">Invalid Password</p>
          </div>
          <div className="text-log">
            <label>
              <input className="checkbox" type="checkbox" value="1" />
              Remember Me
            </label>
          </div>
          <div className="text-log">
            <button className="log-button">Log In</button>
          </div>
          <div className="text-log">
            <div
              className="for-pass"
              onMouseEnter={showThink}
              onMouseLeave={showForget}
            >
              {forgetPasswordInfo}
            </div>
          </div>
        </form>
        <div className="text-log end-log">
          <Link className="trans" to="/signup">
            Create New Account
          </Link>
        </div>
      </div>
      <hr style={{ width: '50%', color: 'antiquewhite' }} />
    </div>
  );
};
