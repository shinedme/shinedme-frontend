import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import queryString from 'query-string';
import config from '../config';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);
const ipfsClient = require('ipfs-http-client');

const profile = {
  nickname: null,
  avatar: null,
};

const upload = {
  photo: null,
  affiliate_url: null,
};

const INIT_STATE = {
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.RPC },
  types: config.CUSTOM_TYPES,
  keyring: null,
  keyringState: null,
  signer: null,
  signerState: null,
  mnemonic: window.localStorage.getItem('shinedMe:mnemonic'),
  api: null,
  apiError: null,
  apiState: null,
  ipfs: ipfsClient(`http://${process.env.IPFS_HOST || 'localhost'}:5001`),
  profile: profile,
  created_name: window.localStorage.getItem('shinedMe:created::name'),
  created_avatar: window.localStorage.getItem('shinedMe:created::avatar'),
  upload: upload,
};

const reducer = (state, action) => {
  let socket = null;

  switch (action.type) {
    case 'RESET_SOCKET':
      socket = action.payload || state.socket;
      return { ...state, socket, api: null, apiState: null };

    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' };

    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' };

    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload };

    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' };

    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' };

    case 'SET_SIGNER':
      return { ...state, signer: action.signer, signerState: 'READY' };

    case 'SIGNER_ERROR':
      return { ...state, signer: null, signerState: action.error };

    case 'NICKNAME':
      return {
        ...state,
        profile: { ...state.profile, nickname: action.nickname },
      };

    case 'AVATAR':
      return { ...state, profile: { ...state.profile, avatar: action.avatar } };

    case 'PHOTO':
      return { ...state, upload: { ...state.upload, photo: action.photo } };

    case 'CLEAR_PHOTO':
      return { ...state, upload: { ...state.upload, photo: null } };

    case 'SET_URL':
      return {
        ...state,
        upload: { ...state.upload, affiliate_url: action.affiliate_url },
      };

    case 'CLEAR_URL':
      return { ...state, upload: { ...state.upload, affiliate_url: null } };

    case 'CREATED_NAME':
      return { ...state, created_name: action.created_name };

    case 'CREATED_AVATAR':
      return { ...state, created_avatar: action.created_avatar };

    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

const SubstrateContext = React.createContext();

const SubstrateContextProvider = (props) => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const neededPropNames = ['socket', 'types'];
  neededPropNames.forEach((key) => {
    initState[key] =
      typeof props[key] === 'undefined' ? initState[key] : props[key];
  });
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <SubstrateContext.Provider value={[state, dispatch]}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

// prop typechecking
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
  types: PropTypes.object,
};

export { SubstrateContext, SubstrateContextProvider };
