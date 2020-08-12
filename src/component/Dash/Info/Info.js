import React from 'react';
import { useHistory } from 'react-router-dom';
import './Info.css';
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';

export default ({ previous, next, index, photos }) => {
  const history = useHistory();
  const openGallery = () => {
    return history.push('/gallery', { photo: photos[index] });
  };

  const openEditor = () => {
    return history.push('/editor', { photo: photos[index] });
  };
  return (
    <div className="home-me">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button className="next" onClick={previous} disabled={index === 0}>
          <TiChevronLeft /> PREVIOUS
        </button>
        <button
          className="next"
          onClick={next}
          disabled={index === photos.length - 1 || photos.length === 0}
        >
          NEXT <TiChevronRight />
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button
          className="shined-me"
          onClick={openGallery}
          disabled={photos.length === 0}
        >
          🤩 Ideas
        </button>
        <button
          className="shined-me"
          onClick={openEditor}
          disabled={photos.length === 0}
        >
          🥳 Have an idea?
        </button>
      </div>
    </div>
  );
};
