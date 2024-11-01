import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">작성하기</button>
    </form>
  );
}

export default PostForm;