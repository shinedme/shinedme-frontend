import { useContext, useEffect, useCallback } from 'react';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
// import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
// import keyring from '@polkadot/ui-keyring';

// import config from '../config';
import { SubstrateContext } from './SubstrateContext';
const bip39 = require('bip39');

const useSubstrate = () => {
  const [state, dispatch] = useContext(SubstrateContext);
  console.log(state);
  // `useCallback` so that returning memoized function and not created
  //   everytime, and thus re-render.
  const { api, socket, jsonrpc, types, mnemonic, keyring } = state;

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
  }, [api, socket, jsonrpc, types, dispatch, keyring, mnemonic]);

  useEffect(() => {
    connect();
  }, [connect]);

  const saveToIpfs = useCallback(
    ([file]) =>
      state.ipfs
        .add(file, { progress: (prog) => console.log(`received: ${prog}`) })
        .then((added) => {
          let avatar = added.cid.toString();
          dispatch({ type: 'AVATAR', avatar });
        }),
    [state.ipfs]
  );

  const saveNickname = (nickname) => {
    dispatch({ type: 'NICKNAME', nickname });
  };

  return { ...state, saveToIpfs, saveNickname };
};

export default useSubstrate;
