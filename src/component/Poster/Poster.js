import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import './Poster.css';

import CircleButton from '../utils/CircleButton';

export default () => {
  const {
    apiState,
    apiError,
    keyringState,
    signerState,
    account,
  } = useSubstrate();

  const { created_name } = account

  const history = useHistory();
  const clicked = () => history.push('/login');
  const created = () => history.push('/dash');

  const loader = (text) => (
    <div>
      <p><img src="grid.svg" alt="" width="40" /></p>
      <p>{text}</p>
    </div>
  );

  const error = (err) => (
    <div>
      <h3>Error Connecting to Substrate</h3>
      <p>{err}</p>
    </div>
  );

  const Button = (
    <>
      <CircleButton
        clicked={() => {
          created_name ? created() : clicked();
        }}
      />
      {created_name ? (
        <p className="text">Start your journey to shining yourself</p>
      ) : (
          <p className="text">Login here</p>
        )}
    </>
  );

  let show;

  if (apiState === 'ERROR') show = error(apiError);
  else if (apiState !== 'READY') show = loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    show = loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  if (signerState !== 'READY') {
    show = loader('Getting your signer with keyring');
  } else if (signerState === 'READY') {
    show = Button;
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
      {show}
    </div>
  );
};
