import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './services/userService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      showMessage('Failed to fetch users. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try {
      if (editingId) {
        await updateUser(editingId, form);
        showMessage('User updated successfully!');
      } else {
        await createUser(form);
        showMessage('User created successfully!');
      }
      setForm({ name: '', email: '', role: '' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      showMessage('Operation failed. Check the console.', 'error');
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role || '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      showMessage('User deleted.');
      fetchUsers();
    } catch (err) {
      showMessage('Delete failed.', 'error');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', email: '', role: '' });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>👤 User Management</h1>
        <p>Spring Boot + React Demo</p>
      </header>

      <main className="main">
        {/* Form */}
        <section className="card form-card">
          <h2>{editingId ? '✏️ Edit User' : '➕ Add New User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                placeholder="Admin / User / Manager"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update User' : 'Create User'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Message */}
        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        {/* Users Table */}
        <section className="card table-card">
          <div className="table-header">
            <h2>📋 All Users</h2>
            <button className="btn btn-refresh" onClick={fetchUsers}>🔄 Refresh</button>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : users.length === 0 ? (
            <div className="empty">No users found. Create one above!</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge">{user.role || 'N/A'}</span>
                    </td>
                    <td>
                      <button className="btn btn-edit" onClick={() => handleEdit(user)}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(user.id)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
