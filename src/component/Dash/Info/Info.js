import React from 'react';
import { useHistory } from 'react-router-dom';
import './Info.css';

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
        <button className="shined-me" onClick={previous} disabled={index === 0}>
          PREVIOUS
        </button>
        <button
          className="shined-me"
          onClick={next}
          disabled={index === photos.length - 1}
        >
          NEXT
        </button>
      </div>

      <button className="shined-me" onClick={openGallery}>
        🤩 Ideas
      </button>
      <button className="shined-me" onClick={openEditor}>
        Have an idea?
      </button>
    </div>
  );
};
