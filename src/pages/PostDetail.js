import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, increment, getDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchPost = useCallback(async () => {
    try {
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        setPost(postSnap.data());
      } else {
        console.log('해당 포스트를 찾을 수 없습니다.');
      }

      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('postId', '==', id));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]); // 의존성 배열에 fetchPost 추가

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const commentData = {
        postId: id,
        text: newComment,
        createdAt: serverTimestamp(),
      };

      // 댓글을 Firestore에 추가
      const docRef = await addDoc(collection(db, 'comments'), commentData);

      // 댓글 수 업데이트
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, {
        commentsCount: increment(1),
      });

      // 댓글 추가 후 상태 업데이트
      setComments(prevComments => [
        ...prevComments,
        { id: docRef.id, ...commentData }
      ]);
      setNewComment(''); // 입력 필드 초기화

    } catch (error) {
      console.error('댓글 추가 중 오류가 발생했습니다:', error);
    }
  };

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="back">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <br />

      <div className="comment">
        <h3>댓글</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={comment.id}>
              <p>{comment.text}</p>
              {index < comments.length - 1 && <div className="comment-divider"></div>} {/* 구분선 추가 */}
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}

        {user ? (
          <div>
            <input 
              type="text" 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="댓글을 입력하세요"
            />
            <button onClick={handleAddComment}>댓글 추가</button>
          </div>
        ) : (
          <p>로그인 후 댓글을 작성할 수 있습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetail;