import React, { useState } from 'react';
import api from '../axios';
import './Form.css';
import { useNavigate } from 'react-router-dom';

export default function Register({ setToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/register', { name, email, password });
    setToken(res.data.token);
    navigate('/notes');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
