import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import './Form.css';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
    navigate('/notes');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
