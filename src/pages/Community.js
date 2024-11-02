// src/pages/Community.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, storage } from '../firebase'; // Firebase Storage import
import { collection, getDocs, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PostItem from './PostItem';
import './Community.css';
function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

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
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await addDoc(collection(db, 'posts'), {
      title,
      content: content.replace(/\n/g, '<br>'), // 줄바꿈 처리
      userNickname: user.email || '익명',
      userId: user.uid,
      timestamp: serverTimestamp(),
      commentsCount: 0,
      imageUrl, // 이미지 URL 저장
    });

    setTitle('');
    setContent('');
    setImage(null);
    fetchPosts();
  };

  return (
    <div className="back">
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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