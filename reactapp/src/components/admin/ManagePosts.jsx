import React, { useState, useEffect } from 'react';
import './ManagePosts.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setPosts([
      { id: 1, title: 'Lost iPhone', type: 'lost', user: 'john@college.edu', status: 'active', date: '2024-01-15' },
      { id: 2, title: 'Found Wallet', type: 'found', user: 'jane@college.edu', status: 'resolved', date: '2024-01-14' }
    ]);
  }, []);

  const filteredPosts = posts.filter(post => 
    filter === 'all' || post.type === filter || post.status === filter
  );

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const toggleStatus = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'active' ? 'resolved' : 'active' }
        : post
    ));
  };

  return (
    <div className="manage-posts">
      <div className="posts-header">
        <h2>Manage Lost/Found Posts</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Posts</option>
          <option value="lost">Lost Items</option>
          <option value="found">Found Items</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-info">
              <h3>{post.title}</h3>
              <p>Type: <span className={`type ${post.type}`}>{post.type}</span></p>
              <p>User: {post.user}</p>
              <p>Status: <span className={`status ${post.status}`}>{post.status}</span></p>
              <p>Date: {post.date}</p>
            </div>
            <div className="post-actions">
              <button onClick={() => toggleStatus(post.id)} className="toggle-btn">
                {post.status === 'active' ? 'Mark Resolved' : 'Mark Active'}
              </button>
              <button onClick={() => handleDelete(post.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;