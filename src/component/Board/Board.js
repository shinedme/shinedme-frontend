import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
        let affiliate_url = photoProfile.affiliate_url;
        setLikes(likes);
        setComments(comments);
        setAffUrl(affiliate_url);
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
    <Modal show={show} Close={Close}>
      <div>
        <img
          style={{ width: '400px', height: '600px' }}
          src={photoUrl}
          alt=""
        />
        <div style={{ width: '340px' }}>
          <button className="shined-me" onClick={openGallery}>
            🤩 gallery
          </button>
          <p style={{ color: '#663300' }}>likes: {likes}</p>
          <p style={{ color: '#663300' }}>Comments: </p>
          {comments.length > 0 ? (
            comments.map((c, index) => <Comment comment={c} key={index} />)
          ) : (
            <p style={{ color: '#663300' }}>no comments now</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
