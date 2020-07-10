import React from 'react';
import Evaluation from './Evaluation/Evaluation';
import Info from './Info/Info';
import Photo from './Photo/Photo';
import './Dash.css';

export default () => {
  return (
    <>
      <div className="main-style">
        <Photo />
        <div className="rightcolumn">
          <Info />
          <Evaluation />
        </div>
      </div>
    </>
  );
};
