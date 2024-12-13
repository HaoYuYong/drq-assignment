import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

const MusicItem = (props) => {
  const [showConfirm, setShowConfirm] = useState(false); // State to control modal visibility

  useEffect(() => {
    console.log("Music Item:", props.mymusic);
  }, [props.mymusic]); // Only run this effect when the mymusic prop changes

  const handleDeleteClick = () => {
    setShowConfirm(true); // Show the confirmation modal when delete button is clicked
  };

  const handleDelete = () => {
    axios.delete('http://localhost:4000/api/music/' + props.mymusic._id)
      .then(() => {
        props.ReloadData(); // Reload music data in parent component
        setShowConfirm(false); // Hide the confirmation modal after deletion
      })
      .catch((err) => {
        console.log("Error deleting music:", err); // Handle error if deletion fails
        setShowConfirm(false); // Hide the modal in case of error as well
      });
  };

  const handleClose = () => setShowConfirm(false); // Close the modal without deleting

  return (
    <div>
      <Card>
        <Card.Header>Music Title: {props.mymusic.title}</Card.Header> {/* Display title */}
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>Artist: {props.mymusic.singer}</p> {/* Display singer */}
            <p>Poster: {props.mymusic.poster}</p> {/* Display poster text (if it's not an image) */}
          </blockquote>
        </Card.Body>        
        <Link to={"/edit/" + props.mymusic._id} className="btn btn-primary">Edit</Link>
        <Button className="btn btn-danger" onClick={handleDeleteClick}>Delete</Button>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this music?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MusicItem;
