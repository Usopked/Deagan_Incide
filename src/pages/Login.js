// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Pages.css';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공!');
      navigate('/postlist'); // 로그인 성공 시 포스팅 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setError('로그인 실패: ' + error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('회원가입 성공!');
      navigate('/postlist'); // 회원가입 성공 시 포스팅 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error.message);
      setError('회원가입 실패: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">로그인</button>
      </form>
      <p>계정이 없으신가요?</p>
      <button onClick={handleSignup} className="signup-button">회원가입</button>
    </div>
  );
}

export default Login;