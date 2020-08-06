import React, { useState } from 'react';
import './Evaluation.css';
import { useSubstrate } from '../../../substrate-lib';
import { TxButton } from '../../../substrate-lib/components';

export default ({ currentPhoto }) => {
  const { signer } = useSubstrate();
  const [status, setStatus] = useState('');
  const openBoard = () => {
    console.log('open bloard');
  };
  const sendComment = () => {
    console.log('send comments');
  };
  return (
    <div className="home-eva">
      <div className="emoji first">
        {signer ? (
          <TxButton
            accountPair={signer}
            label={'🥳 Like it!'}
            setStatus={setStatus}
            type="SIGNED-TX"
            attrs={{
              palletRpc: 'erc20',
              callable: 'likePhoto',
              inputParams: [currentPhoto],
              paramFields: [true],
            }}
            style={{ fontSize: '1.5rem', padding: '10px' }}
          />
        ) : null}
      </div>
      <div className="emoji second" onClick={openBoard}>
        <p>
          Change Style
          <span role="img" aria-label="smile">
            🤩
          </span>{' '}
        </p>
      </div>

      <div className="home-comment">
        <textarea
          rows="4"
          cols="40"
          placeholder="What do you think could be better?"
          maxLength="200"
          id="content"
        ></textarea>
        <button className="submit" onClick={sendComment}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};
