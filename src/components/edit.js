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
  const navigate = useNavigate();

  // useEffect hook to fetch the existing music data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/music/' + id)
      .then((res) => {
        console.log('Success: ' + res.data);
        setTitle(res.data.title);
        setSinger(res.data.singer);
        setDate(res.data.date);
        setPoster(res.data.poster);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const music = { title, singer, date, poster };
    console.log('Updated music:', music);

    // Make a PUT request to update the music in the database using the music ID
    axios
      .put('http://localhost:4000/api/music/' + id, music)
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
            type="text"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Edit Music Poster: </label>
          <input
            type="text"
            className="form-control"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" value="Edit Music" className="btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default Edit;
