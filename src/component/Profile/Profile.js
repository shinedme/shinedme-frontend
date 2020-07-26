import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FiUploadCloud } from 'react-icons/fi';
import { BsPeopleCircle } from 'react-icons/bs';
import './Profile.css';

import Eva from '../utils/Eva';
import Card from '../Card/Card';

import Photo from '../../assets/test.jpg';

export default () => {
  const { id } = useParams();
  const post = 0;
  const like = 0;
  const painting = 0;
  const posts = [
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
    { photoUrl: Photo },
  ];
  const uploadProfilePhoto = () => {};
  return (
    <div className="profile">
      <div className="profile-up">
        <div className="arrow profile-photo" onClick={uploadProfilePhoto}>
          <div className="arrow-link">
            <BsPeopleCircle className="arrow-up" />
          </div>
        </div>

        <div className="profile-info">
          <div className="name">
            <h2>*Name: {id}</h2>
            <h2 style={{ marginLeft: '20px' }}>*Post: {post}</h2>
          </div>
          <Eva like={like} painting={painting} />
        </div>

        <div className="back">
          <Link to="/dash">
            <AiOutlineHome className="close" />
          </Link>
          <Link to="/upload">
            <FiUploadCloud className="close" />
          </Link>
        </div>
      </div>
      <div className="profile-list">
        {posts.length > 0 ? (
          posts.map((p, index) => {
            return <Card photoUrl={p.photoUrl} key={index} />;
          })
        ) : (
          <p className="nophoto">
            You don't have post anything yet. <Link to="/upload">Upload </Link>?
          </p>
        )}
      </div>
    </div>
  );
};
