import React from 'react';

export default ({ comments, likes }) => {
  const Comments = comments.map((c, index) => (
    <Comment comment={c} key={index} />
  ));
  return (
    <div className="comments">
      <p>likes: {likes}</p>
      {Comments}
      <style>{`
  .comments {
    background-color: rgba(255, 255, 204,0.3);
    height: 100%;
    border : 1px dotted #fdfb8b;
    border-radius: 10px;
    max-height: 600px;
  }/
  `}</style>
    </div>
  );
};

export const Comment = ({ comment }) => {
  return (
    <div className="comment">
      {comment}
      <style>{`
    .comment {
      font-size: 1.5rem;
      color: #663300;
      width: 100%;
    }
    `}</style>
    </div>
  );
};
