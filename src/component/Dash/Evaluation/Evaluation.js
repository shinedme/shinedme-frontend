import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { TxButton } from '../../../substrate-lib/components';
import './Evaluation.css';

export default ({ photo, setLikes, setComments, comments, likes }) => {
  const { signer } = useSubstrate();
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const onChange = (e) => {
    setRemark(e.target.value);
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
              inputParams: [photo],
              paramFields: [true],
            }}
            style={{ fontSize: '1.5rem', padding: '10px' }}
            setLikes={setLikes}
            likes={likes}
          />
        ) : null}
      </div>

      <div className="home-comment">
        <textarea
          rows="4"
          cols="40"
          placeholder="What do you think could be better?"
          maxLength="200"
          id="content"
          onChange={onChange}
        ></textarea>
        {signer ? (
          <TxButton
            accountPair={signer}
            label={'🥰 comment'}
            setStatus={setStatus}
            type="SIGNED-TX"
            attrs={{
              palletRpc: 'erc20',
              callable: 'commentPhoto',
              inputParams: [photo, remark],
              paramFields: [true, true],
            }}
            style={{ fontSize: '1.5rem', padding: '10px' }}
            setComments={setComments}
            comments={comments}
            remark={remark}
          />
        ) : null}
      </div>
      <div style={{ overflowWrap: 'break-word' }}>{status}</div>
    </div>
  );
};
