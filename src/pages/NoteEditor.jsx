import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axios';
import './Editor.css';

export default function NoteEditor({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchNote = async () => {
      const res = await api.get(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNote(res.data);
    };
    fetchNote();
  }, [id]);

  const save = async () => {
    await api.put(`/notes/${id}`, { content: note.content }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Saved!');
  };

  const rename = async () => {
    const newTitle = prompt('New title:', note.title);
    if (!newTitle) return;
    await api.patch(`/notes/${id}/rename`, { title: newTitle }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNote(prev => ({ ...prev, title: newTitle }));
  };

  const deleteNote = async () => {
    if (!window.confirm('Delete this note?')) return;
    await api.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/notes');
  };

  return (
    <div className="editor-container">
      <h2>Edit: {note.title}</h2>
      <textarea
        value={note.content}
        onChange={e => setNote({ ...note, content: e.target.value })}
      />
      <div className="editor-actions">
        <button onClick={save}>Save</button>
        <button onClick={rename}>Rename</button>
        <button onClick={deleteNote}>Delete</button>
      </div>
    </div>
  );
}
