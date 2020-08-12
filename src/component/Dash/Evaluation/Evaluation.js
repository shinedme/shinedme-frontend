import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { TxButton } from '../../../substrate-lib/components';
import './Evaluation.css';

export default ({ photo, setLikes, likes }) => {
  const { signer } = useSubstrate();
  const [status, setStatus] = useState('');
  return (
    <div className="home-eva">
      <div
        className="emoji"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <p>likes: {likes}</p>
        {signer ? (
          <TxButton
            accountPair={signer}
            setStatus={setStatus}
            label={'😍 Like'}
            labelDone={'😍 Liked!'}
            type="SIGNED-TX"
            attrs={{
              palletRpc: 'erc20',
              callable: 'likePhoto',
              inputParams: [photo],
              paramFields: [true],
            }}
            setLikes={setLikes}
            likes={likes}
            style={{ display: 'inline' }}
          />
        ) : null}
      </div>
    </div>
  );
};
