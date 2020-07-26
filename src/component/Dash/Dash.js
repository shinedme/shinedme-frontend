import React, { useState } from 'react';
import Evaluation from './Evaluation/Evaluation';
import Info from './Info/Info';
import Photo from './Photo/Photo';
import CommentBoard from './CommentBoard/CommentBoard';
import Board from './Board/Board';
import './Dash.css';

export default () => {
  const comments = ['good', 'awesome'];
  const likes = 9999;
  const [show, dispatchShow] = useState(false);
  const Close = () => {
    dispatchShow(false);
  };
  const Open = () => {
    dispatchShow(true);
  };
  return (
    <>
      <div className="main-style">
        <CommentBoard comments={comments} likes={likes} />
        <Photo />
        <div className="rightcolumn">
          <Info Open={Open} />
          <Evaluation />
        </div>
      </div>
      <Board show={show} Close={Close} />
    </>
  );
};
