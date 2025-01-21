import React from 'react';
import './App.css';
import ListStudent from './components/ListStudent';
import AddStudent from './components/AddStudent';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">List Students</Link>
            </li>
            <li>
              <Link to="/add-student">Add Student</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListStudent />} />
          <Route path="/add-student" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;