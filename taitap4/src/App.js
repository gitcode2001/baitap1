import React from 'react';
import './App.css';
import StudentList from './component/StudentList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <main>
        <StudentList />
      </main>
    </div>
  );
}

export default App;