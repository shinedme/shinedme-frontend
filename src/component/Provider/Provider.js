import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { TxButton } from '../../substrate-lib/components';

import '../Login/landing.css';
import { TiTick } from 'react-icons/ti';
import { RiCloseLine } from 'react-icons/ri';

export default () => {
  const [status, setStatus] = useState('');
  const {
    saveProvider,
    saveTag,
    saveSingle,
    saveTotal,
    provider,
    signer,
    account,
  } = useSubstrate();
  const [vP, setVP] = useState('');
  const setProvider = (e) => {
    let longUrl = e.target.value;
    const expression = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/i;
    const regex = new RegExp(expression);
    if (longUrl.match(regex)) {
      let url = new URL(longUrl).origin;
      saveProvider(url);
      setVP('correct');
    } else {
      setVP('wrong');
    }
  };
  const setTag = (e) => {
    saveTag(e.target.value);
  };

  const setTotal = (e) => {
    let total = e.target.value;
    saveTotal(total);
  };

  const setSingle = (e) => {
    let single = e.target.value;
    saveSingle(single);
  };
  console.log(account.balance)
  return (
    <div className="account">
      <p>Provider Creation Form : </p>
      <div className="text-log">
        <label className="label">URL :</label>
        <input
          type="text"
          placeholder="https://www.amazon.com"
          onChange={setProvider}
          style={{ width: '10rem' }}
        />
        {vP === 'correct' && <TiTick />}
        {vP === 'wrong' && <RiCloseLine />}
        <p style={{ fontSize: '14px', color: '#ffd480' }}>
          Note: please start with https://
        </p>
      </div>
      <div className="text-log">
        <label className="label">TAG : </label>
        <input
          placeholder="shinedme-affiliation-provider"
          type="text"
          onChange={setTag}
          style={{ width: '10rem' }}
        />
        <p style={{ fontSize: '14px', color: '#ffd480' }}>
          Note: REALLY careful about this tag. You will get paid only when it is
          correct and can let user to access website like
          https://www.example.com/product/3?refferrer="YOUR TAG HERE"
        </p>
      </div>
      <div className="text-log">
        <label className="label">TOTAL TOKENS : </label>
        <input
          value={provider.total}
          placeholder="10000"
          type="number"
          onChange={setTotal}
          min="1"
          max={account.balance.toString()}
        />
      </div>
      <div className="text-log">
        <label className="label">SINGLE CLICK TOKEN : </label>
        <input
          type="number"
          placeholder="1"
          onChange={setSingle}
          value={provider.single}
          min="1"
          max={account.balance.toString()}
        />
      </div>
      {signer ? (
        <TxButton
          accountPair={signer}
          label={'👼 Create'}
          labelDone={'👼 Created'}
          setStatus={setStatus}
          type="SIGNED-TX"
          disabled={vP === 'wrong' || parseInt(provider.total) > account.balance || parseInt(provider.total) < 0 || parseInt(provider.single) > account.balance || parseInt(provider.single) < 0}
          attrs={{
            palletRpc: 'erc20',
            callable: 'createAffiliate',
            inputParams: [
              provider.url,
              provider.total,
              provider.single,
              provider.tag,
            ],
            paramFields: [true, true, true, { optional: true }],
          }}
        />
      ) : null}
      <div style={{ overflowWrap: 'break-word' }}>{status}</div>
    </div>
  );
};
