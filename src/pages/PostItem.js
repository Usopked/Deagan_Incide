import React from 'react';
import { Link } from 'react-router-dom';
import './PostItem.css';

function PostItem({ post }) {
  return (
    <div className="post-item">
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.userNickname}</p>
        <p>{new Date(post.timestamp?.seconds * 1000).toLocaleDateString()}</p>
        <p>댓글 {post.commentsCount}개</p>
      </Link>
    </div>
  );
}

export default PostItem;