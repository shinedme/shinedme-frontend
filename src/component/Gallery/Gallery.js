import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import { u8aToString } from '@polkadot/util';

import Card from '../Card/Card';
import Painting from '../Board/Painting';

import { TiArrowBackOutline } from 'react-icons/ti'

export default () => {
  const location = useLocation();
  const photo = location.state.photo;
  const { api } = useSubstrate();
  const [paintings, setPaintings] = useState(null);
  const queryPhotos = useCallback(async () => {
    if (api) {
      let query = await api.query;
      if (query.erc20) {
        let photoProfile = await query.erc20.photos(photo);
        let paintings = photoProfile.variants.map((photo) => {
          let data = u8aToString(photo).toString();
          let index = data.indexOf('https');
          return data.slice(index);
        });
        setPaintings(paintings);
      }
    }
  }, [api, setPaintings, photo]);

  useEffect(() => {
    queryPhotos();
  }, [queryPhotos]);

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');
  const open = (p) => {
    setShow(true);
    setUrl(p);
  };
  const close = () => setShow(false);

  const history = useHistory();
  const back = () => history.goBack()

  return (
    <div className="upload">
      <button style={{ position: 'absolute', top: '150px', right: '50px' }} onClick={back}><TiArrowBackOutline /> </button>
      {paintings ? (paintings.length > 0 ? (
        paintings.map((p, index) => {
          return <Card photoUrl={p} key={index} open={open} />;
        })
      ) : (
          <p>
            No paintings found. You can go back to dashboard and click editor
            button to make first one.
          </p>
        )) : <img src="grid.svg" alt="" width="40" />}
      <Painting show={show} Close={close} photoUrl={url} />
    </div>
  );
};
