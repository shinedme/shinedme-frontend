import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import Avatar from '../utils/Avatar';

import './landing.css';
import { AiOutlineHome } from 'react-icons/ai';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default () => {
  const {
    saveNickname,
    saveToIpfs,
    profile,
    signer,
    api,
    account
  } = useSubstrate();
  const { created_name } = account
  const [status, setStatus] = useState('');

  const changeNickname = (event) => {
    saveNickname(event.target.value);
  };

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    saveToIpfs(event.target.files, 'AVATAR');
  };

  const getInitialMoney = async () => {
    if (signer) {
      let req = await fetch(`http://${process.env.SHINEDME_ACCOUNT_HELPER_HOST || 'localhost'}:4000`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ addr: signer.address }),
      });
      let { txHash } = await req.json();
      console.log(txHash);

      while (1) {
        let { data: balance } = await api.query.system.account(signer.address);
        console.log(balance.free.toString());
        if (balance.free > 0) {
          break;
        }
        await sleep(1000);
      }
    }
  };

  if (created_name) {
    return <Redirect push to="/" />;
  }

  return (
    <div className="login account">
      <div className="log-in">
        <form id="capture-media">
          <p>Please choose an avatar(profile photo)</p>
          {profile.avatar ? (
            <Avatar src={profile.avatar} />
          ) : (
              <input
                type="file"
                name="input-file"
                id="input-file"
                onChange={captureFile}
              />
            )}
          <br />
          <p>Please input a nickname:</p>
          <input
            type="text"
            name="username"
            id="username"
            onChange={changeNickname}
          />
          <br />
          <div className="text-log">
            {signer ? (
              <TxButton
                accountPair={signer}
                label={'Create new Account'}
                setStatus={setStatus}
                type="SIGNED-TX"
                disabled={!profile.nickname || !profile.avatar}
                attrs={{
                  palletRpc: 'erc20',
                  callable: 'updateUser',
                  inputParams: [profile.nickname, profile.avatar],
                  paramFields: [true, true],
                }}
                preop={getInitialMoney}
              />
            ) : (
                ''
              )}
            <div style={{ overflowWrap: 'break-word' }}>{status}</div>
          </div>
        </form>
      </div>
    </div>
  );
};
