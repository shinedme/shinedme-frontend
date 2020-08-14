import { useContext, useEffect, useCallback } from 'react';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { u8aToString } from '@polkadot/util';

// import config from '../config';
import { SubstrateContext } from './SubstrateContext';
const bip39 = require('bip39');

const useSubstrate = () => {
  const [state, dispatch] = useContext(SubstrateContext);
  // `useCallback` so that returning memoized function and not created
  //   everytime, and thus re-render.
  const { api, socket, jsonrpc, types, mnemonic, signer } = state;

  const connect = useCallback(async () => {
    if (api) return;

    const provider = new WsProvider(socket);
    const _api = new ApiPromise({ provider, types, rpc: jsonrpc });

    // We want to listen to event for disconnection and reconnection.
    //  That's why we set for listeners.
    _api.on('connected', () => {
      dispatch({ type: 'CONNECT', payload: _api });
      // `ready` event is not emitted upon reconnection. So we check explicitly here.
      _api.isReady.then((_api) => dispatch({ type: 'CONNECT_SUCCESS' }));
    });
    _api.on('ready', () => {
      dispatch({ type: 'CONNECT_SUCCESS' });
      const keyring = new Keyring({ type: 'sr25519' });
      if (!mnemonic) {
        const mnemonic = bip39.generateMnemonic();
        window.localStorage.setItem('shinedMe:mnemonic', mnemonic);
        const signer = keyring.addFromUri(mnemonic);
        dispatch({ type: 'SET_SIGNER', signer });
      }
      const signer = keyring.addFromUri(mnemonic);
      dispatch({ type: 'SET_KEYRING', payload: keyring });
      dispatch({ type: 'SET_SIGNER', signer });
    });
    _api.on('error', (err) =>
      dispatch({ type: 'CONNECT_ERROR', payload: err })
    );
  }, [api, socket, jsonrpc, types, dispatch, mnemonic]);

  useEffect(() => {
    connect();
  }, [connect]);

  const queryPhotos = useCallback(async () => {
    if (api) {
      let query = await api.query;
      if (query.erc20) {
        let photos = await query.erc20.photos.keys();
        photos = photos.map((photo) => {
          let data = u8aToString(photo).toString();
          let index = data.indexOf('https');
          return data.slice(index);
        });
        dispatch({ type: 'PHOTOS', photos });
        let affiliations = await query.erc20.affiliations.keys();
        affiliations = await Promise.all(
          affiliations.map(async (aff) => {
            let data = u8aToString(aff).toString();
            let index = data.indexOf('https');
            let provider = data.slice(index);
            let value = await query.erc20.affiliations(provider);
            value = value[0];
            return {
              provider,
              single: value.single_click_credit.toString(),
              total: value.total_credit.toString(),
              tag: u8aToString(value.url_append).toString(),
            };
          })
        );
        dispatch({ type: 'AFFILIATIONS', affiliations });
      }
    }
  }, [api, dispatch]);

  useEffect(() => {
    queryPhotos();
  }, [queryPhotos]);

  const queryAccount = useCallback(async () => {
    if (api && signer) {
      let query = await api.query;
      if (query.erc20) {
        let account = await query.erc20.accounts(signer.address);
        let name = u8aToString(account.name).toString();
        if (name !== '') {
          let balance = await query.erc20.balanceOf(signer.address);
          dispatch({ type: 'BALANCE', balance: balance.toString() });
          let avatar = u8aToString(account.avatar).toString();
          let selfies = account.photos.map((photo) => {
            let data = u8aToString(photo).toString();
            let index = data.indexOf('https');
            return data.slice(index);
          });
          dispatch({ type: 'CREATED_NAME', created_name: name });
          dispatch({ type: 'CREATED_AVATAR', created_avatar: avatar });
          dispatch({ type: 'SELFIES', selfies });
        }
      }
    }
  }, [api, signer, dispatch]);

  useEffect(() => {
    queryAccount();
  }, [queryAccount]);

  const saveToIpfs = useCallback(
    async ([file], type) => {
      let src;
      await state.ipfs
        .add(file, { progress: (prog) => console.log(`received: ${prog}`) })
        .then((added) => {
          let result = added.cid.toString();
          src = 'https://ipfs.io/ipfs/' + result;
        });
      let ok;
      while (!ok) {
        let response = await fetch(src);
        ok = response.ok;
        if (ok) {
          if (type === 'AVATAR') {
            dispatch({ type: 'AVATAR', avatar: src });
          }
          if (type === 'PHOTO') {
            dispatch({ type: 'PHOTO', photo: src });
          }
        }
      }
    },
    [state.ipfs, dispatch]
  );

  const saveNickname = (nickname) => {
    dispatch({ type: 'NICKNAME', nickname });
  };

  const setName = (name) => {
    dispatch({ type: 'CREATED_NAME', created_name: name });
  };

  const setAvatar = (url) => {
    dispatch({ type: 'CREATED_AVATAR', created_avatar: url });
  };

  const saveUrl = (url) => {
    dispatch({ type: 'SET_URL', affiliate_url: url });
  };

  const clearPhoto = () => {
    dispatch({ type: 'CLEAR_PHOTO' });
  };

  const clearUrl = () => {
    dispatch({ type: 'CLEAR_URL' });
  };

  const previous = () => {
    if (state.download.index !== 0) {
      dispatch({ type: 'MINUS' });
    }
  };

  const next = () => {
    if (state.download.index !== state.download.photos.length - 1) {
      dispatch({ type: 'ADD' });
    }
  };

  const saveProvider = (url) => {
    dispatch({ type: 'PROVIDER', url });
  };

  const saveTag = (tag) => {
    dispatch({ type: 'TAG', tag: tag });
  };

  const saveSingle = (single) => {
    dispatch({ type: 'SINGLE', single });
  };

  const saveTotal = (total) => {
    dispatch({ type: 'TOTAL', total });
  };

  const saveMnemonic = (mnemonic) => {
    window.localStorage.setItem('shinedMe:mnemonic', mnemonic);
  };

  const setSigner = (signer) => {
    dispatch({ type: 'SET_SIGNER', signer });
  };

  const setBalance = (balance) => {
    dispatch({ type: 'BALANCE', balance: balance.toString() });
  };

  const setSelfies = (selfies) => {
    dispatch({ type: 'SELFIES', selfies });
  };

  return {
    ...state,
    saveToIpfs,
    saveNickname,
    clearPhoto,
    clearUrl,
    saveUrl,
    setName,
    setAvatar,
    previous,
    next,
    saveProvider,
    saveTag,
    saveSingle,
    saveTotal,
    saveMnemonic,
    setSigner,
    setBalance,
    setSelfies,
  };
};

export default useSubstrate;
