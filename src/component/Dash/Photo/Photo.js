import React from 'react';
import './Photo.css';

export default ({ src, affUrl }) => {
  return (
    <div className="wrapper">
      <div className="home-img">
        {affUrl ? (
          <a
            href={affUrl}
            style={{ cursor: 'pointer', outline: 'none' }}
            target="_blank"
          >
            <img
              src={src}
              alt="Please upload your own and join with shined me community"
              className="img-set"
            />
          </a>
        ) : (
          <img
            src={src}
            alt="Please upload your own and join with shined me community"
            className="img-set"
          />
        )}
      </div>
    </div>
  );
};
