import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Test from './pages/Test';
import Login from './pages/Login';
import PostForm from './pages/PostForm';
import PostList from './pages/PostList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/postform">newpost</Link>
            </li>            
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/postlist" element={<PostList />} />
      </Routes>
    </Router>

  );
}

export default App;
