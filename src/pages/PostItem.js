import React from 'react';
import { Link } from 'react-router-dom';
import './PostItem.css';

function PostItem({ post }) {
  return (
    <div className="post-item">
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        {post.imageUrl && <img src={post.imageUrl} alt="Post Thumbnail" className ="post-thumbnail" />} {/* 포스트 썸네일 이미지 표시 */}
        <p>{post.userNickname}</p>
        <p>{new Date(post.timestamp?.seconds * 1000).toLocaleDateString()}</p>
        <p>댓글 {post.commentsCount}개</p>
      </Link>
    </div>
  );
}

export default PostItem;