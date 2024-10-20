import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Test from './Test.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and  save to reload.
          </p>
          <Link to='/test'>Test</Link>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Routes>
        <Route path="/test" element={<Test/>} />
      </Routes>
    </Router>

  );
}

export default App;
