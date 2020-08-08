import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';

import Evaluation from './Evaluation/Evaluation';
import Info from './Info/Info';
import Photo from './Photo/Photo';
import CommentBoard from './CommentBoard/CommentBoard';
import Board from './Board/Board';
import './Dash.css';

export default () => {
  const { download } = useSubstrate();
  console.log(download);
  const photos = download.photos;

  // photo part
  const [index, setIndex] = useState(0);
  const previous = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };
  const next = () => {
    if (index !== photos.length - 1) {
      setIndex(index + 1);
    }
  };

  // likes and comments part
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  //show modal
  const [show, dispatchShow] = useState(false);
  const Close = () => {
    dispatchShow(false);
  };
  const Open = () => {
    dispatchShow(true);
  };
  return (
    <>
      {photos ? (
        <>
          <div className="main-style">
            <CommentBoard comments={comments} likes={likes} />
            <Photo src={photos[index]} />
            <div className="rightcolumn">
              <Info
                Open={Open}
                previous={previous}
                next={next}
                index={index}
                len={photos.length}
              />
              <Evaluation
                photo={photos[index]}
                setLikes={setLikes}
                setComments={setComments}
                comments={comments}
                likes={likes}
              />
            </div>
          </div>
          <Board show={show} Close={Close} />
        </>
      ) : (
        <p>Loading photo</p>
      )}
    </>
  );
};
