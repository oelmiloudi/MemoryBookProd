import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import PostContent from './PostContent'; // Import the PostContent component

function Landing() {
  const [posts, setPosts] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track the hovered post index
  const [viewIndex, setViewIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected files
  const [photos, setPhotos] = useState([]); // State for photos

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      // Assuming photos are stored in the posts' data
      const allPhotos = JSON.parse(storedPosts).reduce((acc, post) => {
        if (post.photos) {
          acc.push(...post.photos);
        }
        return acc;
      }, []);
      setPhotos(allPhotos);
    }
  }, []); // Empty dependency array to ensure this effect runs only once

  // Function to delete a post
  const deletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  

  const handleDeletePhoto = (index, source, event) => {
    event.preventDefault(); 
    if (source === 'photos') {
      const updatedPosts = [...posts];
      updatedPosts.forEach(post => {
        if (post.photos) {
          post.photos.splice(index, 1);
        }
      });
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      const updatedPhotos = [...photos];
      updatedPhotos.splice(index, 1);
      setPhotos(updatedPhotos);
    }
  };

  const openPhotoView = (index) => {
    setViewIndex(index);
  };

  const closePhotoView = () => {
    setViewIndex(null);
  };

  const navigatePhotos = (direction,event) => {
    event.preventDefault();
    if (direction === 'prev') {
      setViewIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    } else {
      setViewIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    }
  };
  
  return (
    <div>
      <h1>Welcome to MemoryBook</h1>
      <p>Where you can book your everlasting memories!</p>
      {/* Render the PostContent component */}
      <PostContent />

      <div className="content-posts">
        <h1>Posts</h1>
        <ul>
          {/* Check if posts is not undefined before mapping over it */}
          {posts && posts.map((post, postIndex) => (
            <li
              key={postIndex}
              onMouseEnter={() => setHoveredIndex(postIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h2>{post.name}</h2>
              <p>Subject: {post.subject} <br></br> </p>
              <p>Description: {post.description}</p>
              <button className="delete-post" onClick={() => deletePost(postIndex)}>Delete</button>
              {/* Display photos if they exist */}
              {post.photos && (
                <div>
                  <h2>Photos:</h2>
                  <div className="post-photos">
                  {post.photos.map((photo, photoIndex) => (
        <div key={photoIndex} className="photo-container" onMouseEnter={() => setHoveredIndex(photoIndex)} onMouseLeave={() => setHoveredIndex(null)}>
          <img src={photo} alt={`Photo ${photoIndex}`} onClick={() => openPhotoView(photoIndex)} />
          {hoveredIndex === photoIndex && ( // Show delete button only when hovered over the photo
            <button className="delete-photo" onClick={(event) => handleDeletePhoto(photoIndex, 'photos', event)}>Delete</button>
          )}
        </div>
      ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {viewIndex !== null && (
        <div className="photo-view-modal">
          <button className="close-button" onClick={closePhotoView}>
            Close
          </button>
          <div className="photo-container">
            <img src={photos[viewIndex]} alt={`View ${viewIndex + 1}`} className="viewed-photo" />
            <button className="prev-button" onClick={(event) => navigatePhotos('prev',event)}>
              &lt;
            </button>
            <button className="next-button" onClick={(event) => navigatePhotos('next',event)}>
              &gt;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Landing;