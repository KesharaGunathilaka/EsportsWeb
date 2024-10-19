import React from 'react';
import './BlogC.css';

const BlogC = ({ blog, onClick }) => {
  return (
    <div className="post-item" onClick={onClick}>
      <div className="post-details">
        <h2 className="text-2xl font-title">{blog.name}</h2>
        <img className='my-4' src={blog.imageURL} alt={blog.name} />
        <p className='font-sidebar text-lg'>{blog.details.slice(0, 200)}...</p>
        <div className="post-stats">
          {/* <span>👍 {blog.likes} Likes</span>
          <span>💬 {blog.comments} Comments</span> */}
        </div>
      </div>
    </div>
  );
};

export default BlogC;
