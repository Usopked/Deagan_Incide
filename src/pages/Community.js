// src/pages/Community.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { db } from '../firebase'; // Firebase 초기화 파일을 import합니다.
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import PostItem from './PostItem';
// import PostForm from './PostForm';
import './Community.css';

function Community() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    if (user) {
      navigate('/create-post'); // 글 작성 페이지로 이동
    } else {
      alert('로그인이 필요합니다.'); // 로그인 필요 메시지
    }
  };

  return (
    <div>
      <h2>커뮤니티</h2>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {user ? (
        <button onClick={handleCreatePost}>글 작성</button>
      ) : (
        <p>로그인 후 글을 작성할 수 있습니다.</p>
      )}
    </div>
  );
}

export default Community;