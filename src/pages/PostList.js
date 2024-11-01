// src/pages/PostList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 예시 데이터 (API에서 가져오는 경우 fetch 등으로 데이터를 불러올 수 있습니다)
    const fetchData = async () => {
      const data = [
        { id: '1', title: '첫 번째 포스트', content: '첫 번째 포스트 내용입니다.' },
        { id: '2', title: '두 번째 포스트', content: '두 번째 포스트 내용입니다.' },
        { id: '3', title: '세 번째 포스트', content: '세 번째 포스트 내용입니다.' }
      ];
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>포스트 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 50)}...</p> {/* 미리보기 형식으로 일부 내용만 표시 */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;