import React from 'react';

export default ({ photoUrl, open }) => {
  return (
    <div className="card" onClick={() => open(photoUrl)}>
      <img style={{ width: '100%', height: '100%' }} src={photoUrl} alt="" />
      <style>{`
      .card {
        color: #663300;
        height: 160px;
        width: 120px;
        padding: 10px;
        background: linear-gradient(
            0deg,
            rgba(209, 245, 242, 0.5),
            rgba(209, 245, 242, 0.3),
            rgba(204, 255, 255, 0),
            rgba(209, 245, 242, 0.5)
        );
        border-radius: 10px;
        box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
                    inset -2px -2px 3px rgba(0, 0, 0, .6);
        box-shadow: 2px 2px 1px 0 rgba(204, 204, 204,0.9);
        display: inline-block;
        margin:5px;
        cursor: pointer;
      }
`}</style>
    </div>
  );
};
