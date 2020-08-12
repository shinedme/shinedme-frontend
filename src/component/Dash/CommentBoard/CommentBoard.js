import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { TxButton } from '../../../substrate-lib/components';

export default ({ photo, setComments, comments }) => {
  const { signer } = useSubstrate();
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const onChange = (e) => {
    setRemark(e.target.value);
  };

  const Comments = comments.map((c, index) => (
    <Comment comment={c} key={index} />
  ));
  return (
    <div>
      <div className="home-comment">
        <textarea
          rows="3"
          cols="40"
          placeholder="What do you think could be better?"
          maxLength="200"
          id="content"
          onChange={onChange}
        ></textarea>
        {signer ? (
          <TxButton
            accountPair={signer}
            setStatus={setStatus}
            label={'🥰 comment'}
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
      <div className="comments">{Comments}</div>
    </div>
  );
};

export const Comment = ({ comment }) => {
  return <div className="comment">{comment}</div>;
};
