import React, { useState } from 'react';
import './PhotoUpload.css';

function PhotoUpload({ onUpload }) {
  const [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewIndex, setViewIndex] = useState(null);

  const handlePhotoSelection = (event) => {
    const newFiles = Array.from(event.target.files);
    const updatedFiles = newFiles.map((file) => {
      let fileName = file.name;
      let counter = 1;
      while (selectedFiles.some((f) => f.name === fileName)) {
        const dotIndex = fileName.lastIndexOf('.');
        fileName = `${file.name.substring(0, dotIndex)}_${counter}${file.name.substring(dotIndex)}`;
        counter++;
      }
      return new File([file], fileName);
    });
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const uploadPromises = selectedFiles.map((file) => {//
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(uploadPromises).then((results) => {
      setPhotos(results);
      onUpload(results);
    });//
// Here you can send the selectedFiles to your Django backend for processing and saving to the database
    // Example: You can use fetch or Axios to send a POST request to your Django API endpoint
    // Make sure to handle file uploads properly on the server side
    // Example:
    /*
    fetch('your-django-api-endpoint', {
      method: 'POST',
      body: selectedFiles,
    })
    .then(response => {
      // Handle response
    })
    .catch(error => {
      // Handle error
    }); 
    */

  };

  const handleDeletePhoto = (index, source, event) => {
    event.preventDefault(); 
    if (source === 'selectedFiles') {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1);
      setSelectedFiles(updatedFiles);
    } else if (source === 'photos') {
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
    <div className="upload-container">
      <div>
        {photos.map((photo, index) => (
          <div key={index} className="photo-container">
            <img
              src={photo}
              alt={`Uploaded ${index + 1}`}
              className="uploaded-photo"
              onClick={() => openPhotoView(index)}
            />
            <button className="delete-button" onClick={(event) => handleDeletePhoto(index, 'photos', event)}>
              X
            </button>
          </div>
        ))}
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handlePhotoSelection}
        multiple
        style={{ display: 'none' }}
      />
      <label htmlFor="fileInput" className="custom-file-button">
        Select Photos
      </label>
      <button onClick={handleSubmit} className="submit-button" disabled={selectedFiles.length === 0}>
        Submit
      </button>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Photos:</h3>
          <ul className="selected-photos">
            {selectedFiles.map((file, index) => (
              <li key={index}>
                {file.name}
                <button className="delete-button" onClick={(event) => handleDeletePhoto(index, 'selectedFiles', event)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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

export default PhotoUpload;