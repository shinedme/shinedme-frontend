import React from 'react';
import './Single.css';

import Eva from '../utils/Eva';
import Share from './Share';

export default () => {
  const url = '';
  return (
    <div className="pro-dt">
      <div className="pro-list">
        <div className="detail-img">
          <img src={url} className="img-set" alt="" />
        </div>

        <div className="pro-right">
          <Eva like={0} painting={0} />
          <Share />
        </div>
      </div>
    </div>
  );
};
