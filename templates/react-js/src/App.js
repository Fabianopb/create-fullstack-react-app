import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState();

  const getUsers = () => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <button className="App-link" onClick={getUsers}>Test endpoint</button>
        {users && <ul>
          {users.map(user => <li key={user.name}>{`${user.name}, ${user.age} years old`}</li>)}
        </ul>}
      </header>
    </div>
  );
}

export default App;
