import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload'; // Import the PhotoUpload component
import './PostContent.css'; // Import the PostContent.css file for styling

function PostContent() {
  const [formVisible, setFormVisible] = useState(false); // State to manage the visibility of the form
  const [name, setName] = useState(''); // State for the name input
  const [subject, setSubject] = useState(''); // State for the subject input
  const [description, setDescription] = useState(''); // State for the description input
  const [uploadedPhotos, setUploadedPhotos] = useState([]); // State for uploaded photos

  // Function to handle uploaded photos
  const handleUploadedPhotos = (photos) => {
    setUploadedPhotos(photos);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a post object with the form data and uploaded photos
    const post = {
      name,
      subject,
      description,
      photos: uploadedPhotos, // Include uploaded photos in the post object
    };
    // Store the post data in localStorage
    const storedPosts = localStorage.getItem('posts');
    const posts = storedPosts ? JSON.parse(storedPosts) : [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    // Reset the form fields and uploaded photos
    setName('');
    setSubject('');
    setDescription('');
    setUploadedPhotos([]);
    // Redirect to the home page or perform any other action
    window.location.href = '/landing'; // Replace '/' with the path to your home page
  };

  return (
    <div className="upload-container"> {/* Add class for styling */}
      {/* Button to toggle the visibility of the form */}
      <button className="create-post-button" onClick={() => setFormVisible(true)}>Create Post</button>
      {/* Form */}
      {formVisible && (
        <form className="post-form" onSubmit={handleSubmit}> {/* Add class for styling */}
          <div className="form-group"> {/* Add class for styling */}
            {/* Name input */}
            <label htmlFor="name">Enter Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group"> {/* Add class for styling */}
            {/* Subject input */}
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          {/* PhotoUpload component */}
          <div className="form-group"> {/* Add class for styling */}
            <label>Upload Photos:</label>
            <PhotoUpload onUpload={handleUploadedPhotos} />
            {/* Pass a callback function to PhotoUpload to handle uploaded photos */}
          </div>
          <div className="form-group"> {/* Add class for styling */}
            {/* Description input */}
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {/* Submit button */}
          <button type="submit" className="submit-button">Submit</button> {/* Add class for styling */}
        </form>
      )}
    </div>
  );
}

export default PostContent;