// Importing necessary libraries and components
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './createCSS.css'; // Import custom CSS for the form styling

// The Create component to add new music
const Create = () => {
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');
  const [date, setDate] = useState('');
  const [poster, setPoster] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a music object containing the values from the form
    const music = { title, singer, date, poster };
    console.log('Music to be sent:', music);

    // Send a POST request to the server to add the new music
    axios
      .post('http://localhost:4000/api/musics', music)
      .then((res) => {
        console.log(res.data);
        setShowModal(true);
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to close the confirmation modal without further action
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle the user confirming the action (redirect to music list)
  const handleConfirm = () => {
    setIsConfirmed(true);
    setShowModal(false);
  };

  // Function to cancel the submission, reset form, and close the modal
  const handleCancel = () => {
    setTitle('');
    setSinger('');
    setDate('');
    setPoster('');
    setShowModal(false);
  };

  // If the user has confirmed, navigate to the music list page
  if (isConfirmed) {
    navigate("/list");
  }

  return (
    <div className="create-form-container">
      <h1 className="form-title">Add New Music</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label>Add Music Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Add Singer: </label>
          <input
            type="text"
            className="form-control"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Publish Date: </label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Add Music Poster: </label>
          <input
            type="text"
            className="form-control"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" value="Add Music" className="btn btn-primary" />
        </div>
      </form>

      {/* Confirmation Modal that appears after the form submission */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Music Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to check the music list or stay on this page?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Stay
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Go to Music List
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Create;
