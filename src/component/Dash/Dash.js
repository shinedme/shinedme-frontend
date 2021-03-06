import React, { useState, useEffect, useCallback } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { u8aToString } from '@polkadot/util';

import Evaluation from './Evaluation/Evaluation';
import Info from './Info/Info';
import Photo from './Photo/Photo';
import CommentBoard from './CommentBoard/CommentBoard';
import './Dash.css';

export default () => {
  const { download, api, previous, next } = useSubstrate();
  const photos = download.photos;
  const index = download.index;

  // likes and comments and url part
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [affUrl, setAffUrl] = useState(null);
  const queryInfo = useCallback(async () => {
    if (api && photos && photos[index]) {
      let query = await api.query;
      if (query.erc20) {
        let photoProfile = await query.erc20.photos(photos[index]);
        let likes = photoProfile.likes.length;
        let comments = photoProfile.comments.map((com) => {
          let data = u8aToString(com).toString();
          return data;
        });
        let affiliate_url = photoProfile.affiliate_url.__private_14_raw;
        affiliate_url = u8aToString(affiliate_url);
        if (!affiliate_url.includes('null')) {
          setAffUrl(affiliate_url);
        }
        setLikes(likes);
        setComments(comments);
      }
    }
  }, [api, photos, setAffUrl, setLikes, setComments, index]);

  useEffect(() => {
    queryInfo();
  }, [queryInfo]);
  return (
    <>
      {photos ? (
        <div className="main-style">
          <Photo src={photos[index]} affUrl={affUrl} />
          <div className="rightcolumn">
            <Info
              previous={previous}
              next={next}
              index={index}
              photos={photos}
            />
            <Evaluation
              photo={photos[index]}
              setLikes={setLikes}
              likes={likes}
            />
            <CommentBoard
              comments={comments}
              photo={photos[index]}
              setComments={setComments}
            />
          </div>
        </div>
      ) : (
          <p>Loading photo</p>
        )}
    </>
  );
};
