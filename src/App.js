import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Test from './pages/Test.js';
import Login from './pages/Login.js';

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
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>

  );
}

export default App;
