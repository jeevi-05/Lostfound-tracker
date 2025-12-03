import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@college.edu', role: 'STUDENT', verified: true, joinDate: '2024-01-10' },
      { id: 2, name: 'Jane Smith', email: 'jane@college.edu', role: 'STUDENT', verified: false, joinDate: '2024-01-12' },
      { id: 3, name: 'Admin User', email: 'admin@college.edu', role: 'ADMIN', verified: true, joinDate: '2024-01-01' }
    ]);
  }, []);

  const filteredUsers = users.filter(user => 
    filter === 'all' || user.role === filter || (filter === 'verified' && user.verified) || (filter === 'unverified' && !user.verified)
  );

  const toggleVerification = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, verified: !user.verified } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="user-management">
      <div className="users-header">
        <h2>User Management</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Users</option>
          <option value="STUDENT">Students</option>
          <option value="ADMIN">Admins</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className={`role ${user.role.toLowerCase()}`}>{user.role}</span></td>
                <td><span className={`verification ${user.verified ? 'verified' : 'unverified'}`}>
                  {user.verified ? 'Verified' : 'Unverified'}
                </span></td>
                <td>{user.joinDate}</td>
                <td className="actions">
                  <button onClick={() => toggleVerification(user.id)} className="verify-btn">
                    {user.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;