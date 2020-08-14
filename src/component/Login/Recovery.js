import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Keyring } from '@polkadot/api';
import { u8aToString } from '@polkadot/util';

import { useSubstrate } from '../../substrate-lib';

import { TiArrowBackOutline } from 'react-icons/ti';
import './landing.css';

export default () => {
  const {
    setName,
    account,
    setSigner,
    api,
    setBalance,
    setAvatar,
    setSelfies,
    saveMnemonic,
    mnemonic,
  } = useSubstrate();
  const { created_name } = account;
  const [status, setStatus] = useState('');
  if (created_name) {
    return <Redirect push to="/" />;
  }

  const changeMnemonic = (e) => {
    saveMnemonic(e.target.value.trim());
  };

  const recover = async () => {
    const keyring = new Keyring({ type: 'sr25519' });
    const signer = keyring.addFromUri(mnemonic);
    setSigner(signer);
    let query = await api.query;
    if (query.erc20) {
      let account = await query.erc20.accounts(signer.address);
      let name = u8aToString(account.name).toString();
      if (name !== '') {
        let balance = await query.erc20.balanceOf(signer.address);
        setBalance(balance);
        let avatar = u8aToString(account.avatar).toString();
        let selfies = account.photos.map((photo) => {
          let data = u8aToString(photo).toString();
          let index = data.indexOf('https');
          return data.slice(index);
        });
        setName(name);
        setAvatar(avatar);
        setSelfies(selfies);
      } else {
        setStatus('account could not be found');
      }
    }
  };

  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div className="login account">
      <div className="log-in">
        <p
          style={{
            cursor: 'pointer',
            marginTop: '0',
            marginBottom: '0',
            textAlign: 'end',
          }}
          onClick={goBack}
        >
          <TiArrowBackOutline style={{ fontSize: '2rem' }} />{' '}
        </p>
        <p>Please input your 12 words:</p>
        <input
          type="text"
          name="recovery"
          id="recovery"
          onChange={changeMnemonic}
          style={{ fontSize: '2rem' }}
        />
        <br />
        <div style={{ marginTop: '20px' }}>
          <button className="shined-me" onClick={recover}>
            Recover account
          </button>
          <div style={{ overflowWrap: 'break-word' }}>{status}</div>
        </div>
      </div>
    </div>
  );
};
