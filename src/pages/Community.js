// src/pages/Community.js
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { db } from '../firebase'; // auth를 firebase에서 import
import { collection, getDocs, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import PostItem from './PostItem';
import './Community.css';

function Community() {
  const { user } = useAuth();
  // const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        userNickname: user.email || '익명',
        userId: user.uid,
        timestamp: serverTimestamp(),
        commentsCount: 0,
      });
      setTitle('');
      setContent('');
      fetchPosts(); // 새로운 포스트 추가 후 목록 갱신
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <div className = "back">
      <h2>대건다방</h2>

      {user ? (
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">작성하기</button>
        </form>
      ) : (
        <p>로그인 후 글을 작성할 수 있습니다.</p>
      )}

      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Community;