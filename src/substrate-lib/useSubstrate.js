import { useContext, useEffect, useCallback } from 'react';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
// import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
// import keyring from '@polkadot/ui-keyring';

// import config from '../config';
import { SubstrateContext } from './SubstrateContext';
const bip39 = require('bip39');

const useSubstrate = () => {
  const [state, dispatch] = useContext(SubstrateContext);
  // `useCallback` so that returning memoized function and not created
  //   everytime, and thus re-render.
  const { api, socket, jsonrpc, types, mnemonic } = state;

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

  const saveUrl = (url) => {
    dispatch({ type: 'SET_URL', affiliate_url: url });
  };

  const clearPhoto = () => {
    dispatch({ type: 'CLEAR_PHOTO' });
  };

  const clearUrl = () => {
    dispatch({ type: 'CLEAR_URL' });
  };

  return { ...state, saveToIpfs, saveNickname, clearPhoto, clearUrl, saveUrl };
};

export default useSubstrate;
