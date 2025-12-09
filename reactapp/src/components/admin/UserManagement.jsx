import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    filter === 'all' || user.role === filter || (filter === 'verified' && user.verified) || (filter === 'unverified' && !user.verified)
  );

  const toggleVerification = async (id) => {
    try {
      await adminService.toggleUserVerification(id);
      setUsers(users.map(user => 
        user.id === id ? { ...user, verified: !user.verified } : user
      ));
    } catch (error) {
      console.error('Error toggling verification:', error);
      alert('Failed to update verification status');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await adminService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="user-management">
      <div className="users-header">
        <div className="header-content">
          <h2>👥 User Management</h2>
          <span className="user-count">{filteredUsers.length} Users</span>
        </div>
        <div className="filter-section">
          <label>Filter by:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="STUDENT">Students</option>
            <option value="ADMIN">Admins</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        {loading ? (
          <div className="no-users">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="no-users">No users found matching your filter</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>👤 Name</th>
                <th>✉️ Email</th>
                <th>🎓 Role</th>
                <th>✓ Status</th>
                <th>📅 Join Date</th>
                <th>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="user-name">{user.name || user.email.split('@')[0]}</td>
                  <td className="user-email">{user.email}</td>
                  <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td><span className={`status-badge ${user.verified ? 'verified' : 'unverified'}`}>
                    {user.verified ? '✓ Verified' : '⚠ Unverified'}
                  </span></td>
                  <td className="join-date">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="actions">
                    <button onClick={() => toggleVerification(user.id)} className="verify-btn" title={user.verified ? 'Unverify user' : 'Verify user'}>
                      {user.verified ? '🚫 Unverify' : '✓ Verify'}
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="delete-btn" title="Delete user">
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;