import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Create = () => {
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');
  const [poster, setPoster] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isConfirmed, setIsConfirmed] = useState(false); // State to track if user confirmed action
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    const music = { title, singer, poster };
    console.log('Music to be sent:', music);

    axios
      .post('http://localhost:4000/api/musics', music)
      .then((res) => {
        console.log(res.data);

        // Show the confirmation modal after successfully adding music
        setShowModal(true);
      })
      .catch((error) => console.error('Error:', error)); // Log the error
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal without taking action
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setShowModal(false);
  };

  const handleCancel = () => {
    setTitle('');
    setSinger('');
    setPoster('');
    setShowModal(false); // Close modal and clear the form
  };

  if (isConfirmed) {
    navigate("/read"); // Redirect to the music list after confirmation
  }

  return (
    <div>
      <h3>Hello from create component</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Music: </label>
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
          <label>Add Music Poster: </label>
          <input
            type="text"
            className="form-control"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Add Music" className="btn btn-primary" />
        </div>
      </form>

      {/* Confirmation Modal */}
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
