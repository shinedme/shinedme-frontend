import React from 'react';
import './Photo.css';

export default ({ src, affUrl }) => {
  console.log(affUrl);
  return (
    <div className="wrapper">
      <div className="home-img">
        {affUrl ? (
          <a
            href={affUrl}
            style={{ cursor: 'pointer', outline: 'none' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={src}
              alt="Please upload your own and join with shined me community later"
              className="img-set"
            />
          </a>
        ) : (
            <img
              src={src}
              alt="Please upload your own and join with shined me community later"
              className="img-set"
            />
          )}
      </div>
    </div>
  );
};
