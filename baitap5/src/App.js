import React from 'react';
import './App.css';
import ListStudent from './components/ListStudent';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import DetailStudent from './components/DetailStudent';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Student Management</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">List Students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-student">Add Student</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<ListStudent />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student/:id/edit" element={<EditStudent />} />
          <Route path="/student/:id/view" element={<DetailStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;