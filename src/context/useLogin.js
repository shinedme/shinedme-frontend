import React, {
  useReducer,
  useCallback,
  createContext,
  useEffect,
} from 'react';

const ipfsClient = require('ipfs-http-client');
const { Keyring } = require('@polkadot/api');

const bip39 = require('bip39');

const initialState = {
  added_file_hash: null,
  ipfs: ipfsClient('/ip4/127.0.0.1/tcp/5001'),
  keyring: new Keyring({ type: 'sr25519' }),
  mnemonic: window.localStorage.getItem('shinedMe:mnemonic'),
  signer: null,
  nickname: null,
};

const reducer = (currentState, action) => {
  switch (action.type) {
    case 'file_hash':
      return {
        ...currentState,
        added_file_hash: action.added_file_hash,
      };
    case 'keyring':
      return {
        ...currentState,
        keyring: action.keyring,
      };
    case 'ipfs':
      return {
        ...currentState,
        ipfs: action.ipfs,
      };
    case 'signer':
      return {
        ...currentState,
        signer: action.signer,
      };
    case 'nickname':
      return {
        ...currentState,
        nickname: action.nickname,
      };
    case 'mnemonic':
      return {
        ...currentState,
        mnemonic: action.mnemonic,
      };
    default:
      return initialState;
  }
};

export const LoginContext = createContext(initialState);

const LoginProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  const setSigner = useCallback(() => {
    const mnemonic = bip39.generateMnemonic();
    window.localStorage.setItem('shinedMe:mnemonic', mnemonic);
    dispatchState({ type: 'mnemonic', mnemonic });
    const signer = state.keyring.addFromUri(state.mnemonic);
    dispatchState({ type: 'signer', signer });
  }, [state.keyring, state.mnemonic]);

  useEffect(() => {
    if (state.mnemonic) {
      const signer = state.keyring.addFromUri(state.mnemonic);
      dispatchState({ type: 'signer', signer });
    } else {
      setSigner();
    }
  }, [setSigner, state.keyring, state.mnemonic]);

  const saveToIpfs = useCallback(
    ([file]) =>
      state.ipfs
        .add(file, { progress: (prog) => console.log(`received: ${prog}`) })
        .then((added) => {
          let added_file_hash = added.cid.toString();
          dispatchState({ type: 'file_hash', added_file_hash });
        }),
    [state.ipfs]
  );

  const saveNickname = (nickname) => {
    dispatchState({ type: 'nickname', nickname });
  };

  const value = {
    added_file_hash: state.added_file_hash,
    ipfs: state.ipfs,
    keyring: state.keyring,
    mnemonic: state.mnemonic,
    signer: state.signer,
    nickname: state.nickname,
    saveNickname,
    saveToIpfs,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export default LoginProvider;
