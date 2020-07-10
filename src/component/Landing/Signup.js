import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

export default () => {
  const signup = () => {};
  return (
    <div className="signup account">
      <div className="log-in">
        <Link className="close" tp="/">
          <i className="far fa-times-circle"></i>
        </Link>
        <alert></alert>
        <h3>Sign Up :</h3>
        <form
          className="login-account"
          method="GET"
          action="#"
          onSubmit={signup}
        >
          <div className="text-log">
            <label className="label" for="id">
              <i className="fas fa-user-circle"></i>
            </label>
            <input
              className="info"
              type="text"
              name="username"
              placeholder="Your Name"
              required
              pattern="\S+"
              minlength="8"
            />
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
            <p className="hint">At least 8 characters!</p>
          </div>
          <div className="text-log">
            <label className="label" for="id">
              <i className="fas fa-envelope"></i>
            </label>
            <input
              className="info"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              pattern="^(\w|\.|-)+@\w+\.(\w|\.)+$"
              minlength="6"
            />
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
            <p className="hint">Must be an email address!</p>
          </div>
          <div className="text-log">
            <label className="label" for="pass">
              <i className="fas fa-unlock"></i>
            </label>
            <input
              className="info"
              type="password"
              name="userpass"
              placeholder="Your Password"
              required
              pattern="\S+"
              minlength="8"
            />
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
            <p className="hint">At least 8 digits!</p>
          </div>
          <div className="text-log">
            <label className="label" for="pass">
              <i className="fas fa-unlock"></i>
            </label>
            <input
              className="info"
              type="password"
              name="userpass2"
              placeholder="Confirm Your Password"
              required
              pattern="{{ userpass.value }}"
              minlength="8"
            />
            <i className="fas fa-check"></i>
            <i className="fas fa-times"></i>
            <p className="hint">Password does not match!</p>
          </div>
          <div className="text-log">
            <label>
              <input className="checkbox" type="checkbox" value="1" />
              Remember Me
            </label>
          </div>
          <div className="text-log">
            <button className="log-button">Sign Up</button>
          </div>
        </form>
        <div className="text-log end-log">
          Already have account ?{' '}
          <Link className="trans" to="/login">
            LogIn
          </Link>
        </div>
      </div>

      <hr style={{ width: '50%', color: 'antiquewhite' }} />
    </div>
  );
};
