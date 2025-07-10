import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import './Notes.css';

export default function Notes({ token }) {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const loadNotes = async () => {
    const res = await api.get('/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const openFirstMatch = () => {
    const match = notes.find(n => n.title.toLowerCase().includes(query.toLowerCase()));
    if (match) navigate(`/notes/${match._id}`);
  };

  const createNote = async () => {
    const res = await api.post('/notes', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate(`/notes/${res.data._id}`);
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <input
          placeholder="Search and press Enter"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && openFirstMatch()}
        />
        <button onClick={createNote}>+ New Note</button>
      </div>
      <ul className="notes-list">
        {notes.map(note => (
          <li key={note._id} onClick={() => navigate(`/notes/${note._id}`)}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
