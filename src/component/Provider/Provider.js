import React from 'react';
import '../Login/landing.css';

export default () => {
  return (
    <div className="account">
      <div className="text-log">
        <label className="label">URL :</label>
        <input placeholder="" />
      </div>
      <div className="text-log">
        <label className="label">URL APPEND :</label>
        <input placeholder="" />
      </div>
      <div className="text-log">
        <label className="label">TOTAL TOKEN FOR CLICK:</label>
        <input placeholder="1000000000" type="number" />
      </div>
      <div className="text-log">
        <label className="label">SINGLE TOKEN FOR CLICK:</label>
        <input type="number" placeholder="1" />
      </div>
    </div>
  );
};
