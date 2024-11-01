// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Login from './pages/Login';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import PostForm from './pages/PostForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/create-post" element={<PostForm />} />
          <Route path="/" element={<Login />} />
          <Route path="/community" element={<Community />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;