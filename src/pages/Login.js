import './Pages.css';
// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // auth 가져오기
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공!');
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setError(error.message);
    }
  };

  const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  };

  return (
    <div className="Pages" style={styles.container}>
      <h2>로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;