import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Profile.css';

import Eva from '../utils/Eva';

export default () => {
  const { id } = useParams();
  const post = 0;
  const like = 0;
  const painting = 0;
  const logout = () => {};
  return (
    <div className="profile">
      <div className="back">
        <Link to="/dash">
          <i className="fas fa-home"></i>
        </Link>
        <Link to="/upload">
          <i className="fas fa-arrow-circle-up"></i>
        </Link>
        <button onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>

      <div className="profile-info">
        <div className="name">
          <div className="nick">
            <h2>Name: {id}</h2>
            <i className="far fa-edit"></i>
          </div>
          <h2>Post: {post}</h2>
        </div>
        <Eva like={like} painting={painting} />
      </div>
      {post > 0 ? (
        <div className="profile-list-style">
          {/* <ul className="ul-style">
        <li className="li-style" >
          <img className="image-list" src="{{photoUrl(photo)}}" onClick={viewPhotoDetail(photo)}>
          <p>Likes: {{photo.like_count}}</p>
          <p>Dislikes: {{photo.dislike_count}}</p>
        </li>
      </ul> */}
        </div>
      ) : (
        <button>
          {' '}
          <p className="nophoto">
            You don't have post anything yet. <Link to="/upload">Upload ?</Link>
          </p>
        </button>
      )}
    </div>
  );
};
