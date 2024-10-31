// src/pages/PostForm.js
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        author: user.email,
        createdAt: Timestamp.now(),
      });
      console.log('게시글이 성공적으로 작성되었습니다.');
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('게시글 작성 오류:', error);
      setError('게시글 작성에 실패했습니다.');
    }
  };

  const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: 'auto', paddingTop: '50px' },
  };

  return (
    <div style={styles.container}>
      <h2>게시글 작성</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default PostForm;