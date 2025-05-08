import React, { useState } from 'react';
import axios from 'axios';
import './IssueForm.css';

const IssueForm = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  const resetForm = () => {
    setDescription('');
    setImage(null);
    setImagePreview(null); // Reset the preview as well
    document.getElementById('image-input').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if description and image are provided
    if (!description || !image) {
      alert("Please fill all the required fields: Description and Image.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);
      formData.append("lat", pos.coords.latitude);
      formData.append("lng", pos.coords.longitude);
      formData.append("timestamp", new Date().toISOString()); // Add current timestamp

      try {
        // Ensure you're using the correct endpoint here
        const response = await axios.post('https://fixit-backend-k1od.onrender.com/api/issues', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Let Axios handle this if needed
          },
        });
        console.log("Issue submitted:", response.data); // You can log the response to verify
        alert("Issue submitted!");
        resetForm();
      } catch (err) {
        console.error("Failed to submit issue:", err);
        alert("Something went wrong while submitting the issue.");
      }
    }, (err) => {
      console.error("Geolocation error:", err);
      alert("Unable to get location.");
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='heading'>
        <h1 className='mainHeading'>FixMyNeighborhood</h1>
        <p className='instructions'>
          Welcome to FixMyNeighborhood! Please report any issues in your locality by providing a description, your name, contact info, locality, and area for better communication. You can also upload an image to support your report. After submitting, we will review the issues and take necessary actions.
        </p>
      </div>
      <div className='container'>
        <h3>Report an issue</h3>
        <form onSubmit={handleSubmit} className='form'>
          <textarea
            className='textArea'
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3>Upload an image</h3>
          <input
            className='imageInput'
            type="file"
            id="image-input"
            onChange={handleImageChange} // Handle file input change
          />
          
          {/* Image preview */}
          {imagePreview && (
            <div className='imagePreview'>
              <img
                src={imagePreview}
                alt="Preview"
                className="previewImage"
              />
            </div>
          )}

          <button className='submitButton' type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default IssueForm;
