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
        <h2>Manage Lost/Found Posts ({filteredPosts.length})</h2>
        <div className="filters">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="lost">Lost Items</option>
            <option value="found">Found Items</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="LOST">Lost</option>
            <option value="FOUND">Found</option>
            <option value="CLAIMED">Claimed</option>
            <option value="AVAILABLE">Available</option>
          </select>
          <button onClick={fetchData} className="refresh-btn">Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <div key={`${post.type}-${post.id}`} className="post-card">
              {post.photoUrl && <img src={`http://localhost:8080${post.photoUrl}`} alt={post.itemName} />}
              <div className="post-info">
                <h3>{post.itemName}</h3>
                <p className="description">{post.description}</p>
                <p><strong>Type:</strong> <span className={`type ${post.type}`}>{post.type.toUpperCase()}</span></p>
                <p><strong>Category:</strong> {post.categoryName}</p>
                <p><strong>User:</strong> {post.userName} ({post.user})</p>
                <p><strong>Location:</strong> {post.lostLocation || post.foundLocation}</p>
                <p><strong>Date:</strong> {post.lostDate || post.foundDate}</p>
                <p><strong>Status:</strong> <span className={`status ${post.status.toLowerCase()}`}>{post.status}</span></p>
                <p className="posted-time">Posted: {new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className="post-actions">
                <button onClick={() => toggleStatus(post.id, post.status, post.type)} className="toggle-btn">
                  Change Status
                </button>
                <button onClick={() => handleDelete(post.id, post.type)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePosts;