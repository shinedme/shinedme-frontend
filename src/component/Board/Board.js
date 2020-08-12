import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { u8aToString } from '@polkadot/util';

import Modal from '../utils/Modal';
import { Comment } from '../Dash/CommentBoard/CommentBoard';

export default ({ show, Close, photoUrl }) => {
  const { api } = useSubstrate();

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [affUrl, setAffUrl] = useState(null);

  const queryInfo = useCallback(async () => {
    if (api && photoUrl) {
      let query = await api.query;
      if (query.erc20) {
        let photoProfile = await query.erc20.photos(photoUrl);
        let likes = photoProfile.likes.length;
        let comments = photoProfile.comments.map((com) => {
          let data = u8aToString(com).toString();
          return data;
        });
        setLikes(likes);
        setComments(comments);

        let affiliate_url = photoProfile.affiliate_url.__private_14_raw;
        affiliate_url = u8aToString(affiliate_url);
        if (affiliate_url.length > 0) {
          setAffUrl(affiliate_url);
        }
      }
    }
  }, [api, photoUrl, setAffUrl, setLikes, setComments]);

  useEffect(() => {
    queryInfo();
  }, [queryInfo]);

  const history = useHistory();
  const openGallery = () => {
    return history.push('/gallery', { photo: photoUrl });
  };

  return (
    <Modal show={show} Close={Close} className="profile">
      <div style={{ height: '100%', overflowY: 'scroll', paddingTop: '20px' }}>
        <img
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '400px',
            maxHeight: '600px',
          }}
          src={photoUrl}
          alt=""
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            color: '#663300',
            textAlign: 'start',
            paddingLeft: '10px',
          }}
        >
          {affUrl ? <p className="pro">{affUrl}</p> : null}
          <button className="shined-me" onClick={openGallery}>
            🤩 gallery
          </button>
          <p className="pro">likes: {likes}</p>
          <p className="pro">Comments: </p>
          {comments.length > 0 ? (
            comments.map((c, index) => <Comment comment={c} key={index} />)
          ) : (
            <p>no comments now</p>
          )}
        </div>
        <style>{`
            .pro {font-size: 1rem;}
          `}</style>
      </div>
    </Modal>
  );
};
