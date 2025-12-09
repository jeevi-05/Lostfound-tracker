import React, { useState, useEffect } from 'react';
import './ManagePosts.css';
import { adminService } from '../../services/adminService';

const ManagePosts = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lost, found] = await Promise.all([
        adminService.getLostItems(categoryFilter || null, statusFilter || null, null),
        adminService.getFoundItems(categoryFilter || null, statusFilter || null, null)
      ]);
      setLostItems(lost);
      setFoundItems(found);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter]);

  const fetchCategories = async () => {
    try {
      const cats = await adminService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      if (type === 'lost') {
        await adminService.deleteLostItem(id);
        setLostItems(lostItems.filter(item => item.id !== id));
      } else {
        await adminService.deleteFoundItem(id);
        setFoundItems(foundItems.filter(item => item.id !== id));
      }
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  const toggleStatus = async (id, currentStatus, type) => {
    try {
      if (type === 'lost') {
        const newStatus = currentStatus === 'LOST' ? 'FOUND' : currentStatus === 'FOUND' ? 'CLAIMED' : 'LOST';
        await adminService.updateLostItemStatus(id, newStatus);
        setLostItems(lostItems.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        ));
      } else {
        const newStatus = currentStatus === 'AVAILABLE' ? 'CLAIMED' : 'AVAILABLE';
        await adminService.updateFoundItemStatus(id, newStatus);
        setFoundItems(foundItems.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        ));
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const allPosts = [
    ...lostItems.map(item => ({ ...item, type: 'lost', user: item.reporterEmail, userName: item.reporterName })),
    ...foundItems.map(item => ({ ...item, type: 'found', user: item.finderEmail, userName: item.finderName }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredPosts = typeFilter === 'all' ? allPosts : allPosts.filter(post => post.type === typeFilter);

  return (
    <div className="manage-posts">
      <div className="posts-header">
        <div className="header-content">
          <h2>📋 Manage Posts</h2>
        </div>
        <div className="filters">
          <div className="filter-group">
            <label>Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="LOST">Lost</option>
              <option value="FOUND">Found</option>
              <option value="CLAIMED">Claimed</option>
              <option value="AVAILABLE">Available</option>
            </select>
          </div>
          <button onClick={fetchData} className="refresh-btn" title="Refresh data">🔄</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.length === 0 ? (
            <div className="no-posts">No posts found matching your filters</div>
          ) : (
            filteredPosts.map(post => (
              <div key={`${post.type}-${post.id}`} className="post-card">
                <div className="card-header">
                  <span className={`type-badge ${post.type}`}>{post.type.toUpperCase()}</span>
                  <span className={`status-badge ${post.status.toLowerCase()}`}>{post.status}</span>
                </div>
                {post.photoUrl && (
                  <div className="post-image">
                    <img src={`http://localhost:8080${post.photoUrl}`} alt={post.itemName} />
                  </div>
                )}
                <div className="post-info">
                  <h3 className="item-name">{post.itemName}</h3>
                  <p className="description">{post.description}</p>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">📁 Category</span>
                      <span className="info-value">{post.categoryName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">👤 User</span>
                      <span className="info-value">{post.userName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">📍 Location</span>
                      <span className="info-value">{post.lostLocation || post.foundLocation}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">📅 Date</span>
                      <span className="info-value">{post.lostDate || post.foundDate}</span>
                    </div>
                  </div>
                  <div className="post-meta">
                    <span className="email">✉️ {post.user}</span>
                    <span className="posted-time">🕒 {new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="post-actions">
                  <button onClick={() => toggleStatus(post.id, post.status, post.type)} className="toggle-btn" title="Change status">
                    🔄 Change Status
                  </button>
                  <button onClick={() => handleDelete(post.id, post.type)} className="delete-btn" title="Delete post">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePosts;