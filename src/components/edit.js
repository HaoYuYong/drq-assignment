// Importing necessary libraries and modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editCSS.css'; 

// Define the Edit functional component
const Edit = () => {
  let { id } = useParams();
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');
  const [date, setDate] = useState('');
  const [poster, setPoster] = useState(''); 
  const [posterPreview, setPosterPreview] = useState('');
  const navigate = useNavigate();

  // useEffect hook to fetch the existing music data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/music/' + id)
      .then((res) => {
        console.log('Success: ', res.data);
        setTitle(res.data.title);
        setSinger(res.data.singer);
        setDate(res.data.date);
        setPoster(res.data.poster);
        setPosterPreview(`http://localhost:4000${res.data.poster}`); // Set posterPreview to the existing poster URL
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

 const handlePosterChange = (e) => {
    setPoster(e.target.files[0]); // Set the poster state to the selected file
    const file = e.target.files[0];
    if (file) {
      setPosterPreview(URL.createObjectURL(file)); // Show a preview of the uploaded image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('singer', singer);
    formData.append('date', date);
    if (poster) {
      formData.append('poster', poster);
    } else {
      formData.append('poster', posterPreview); // Keep the existing poster
    }

    axios
      .put(`http://localhost:4000/api/music/${id}`, formData)
      .then((res) => {
        console.log('Edited: ' + res.data);
        navigate('/list');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // The component returns the JSX layout for the edit form
  return (
    <div className="edit-form-container">
      <h3 className="form-title">Edit Music</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Music Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Edit Music Singer: </label>
          <input
            type="text"
            className="form-control"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Edit Publish Date: </label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Edit Music Poster: </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handlePosterChange}
          />
        </div>
        <div className="poster-preview-container">
        <label>Current Poster: </label>
          {posterPreview && (
            <img
              src={posterPreview}
              alt="Current poster preview"
              style={{ width: '200px', height: 'auto' }}
            />
          )}
        </div>
        <div className="button-container">
          <input type="submit" value="Edit Music" className="btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default Edit;
