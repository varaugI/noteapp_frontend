import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import NoteEditor from './pages/NoteEditor';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <div>
      <header className="header">
        <h1><Link to="/">NoteApp</Link></h1>
        <div>
          {token ? (
            <>
              <Link to="/notes">Notes</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/notes" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/notes" />} />
          <Route path="/register" element={!token ? <Register setToken={setToken} /> : <Navigate to="/notes" />} />
          <Route path="/notes" element={token ? <Notes token={token} /> : <Navigate to="/login" />} />
          <Route path="/notes/:id" element={token ? <NoteEditor token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
