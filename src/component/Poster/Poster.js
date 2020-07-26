import React from 'react';
import { useHistory } from 'react-router-dom';
import './Poster.css';

import CircleButton from '../utils/CircleButton';

export default () => {
  const isAuth = true;
  const history = useHistory();

  let clicked = () => {};
  if (isAuth) {
    clicked = () => history.push({ pathname: '/dash', hash: '1234567' });
  }

  // back part
  let squares = [];
  for (let i = 0; i < 20; i++) {
    squares.push(i);
  }
  const generateRandomNum = ({ min, max }) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  return (
    <div className="intro">
      <div className="quote">
        <h1>Share Your Next</h1>
        <p>outfit style and link for other to buy</p>
      </div>

      <div className="squares-wrapper">
        <ul className="squares">
          {squares.map((el, i) => {
            const randomDimensions = Math.floor(
              Math.random() * (150 - 15 + 1) + 15
            );

            return (
              <li
                key={i}
                style={{
                  left: `${generateRandomNum({ min: 0, max: 90 })}%`,
                  width: randomDimensions,
                  height: randomDimensions,
                  animationDelay: `${
                    i % 2 ? generateRandomNum({ min: 0, max: 20 }) : 0
                  }s`,
                  animationDuration: `${generateRandomNum({
                    min: 10,
                    max: 50,
                  })}s`,
                }}
              />
            );
          })}
        </ul>
      </div>

      <CircleButton clicked={clicked} />
      <p className="text">This is the login button</p>
    </div>
  );
};
