// Importing necessary React hooks and components
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

// MusicItem component definition
const MusicItem = (props) => {
  const [showConfirm, setShowConfirm] = useState(false); 

  // useEffect hook to log the music item whenever the 'mymusic' prop changes
  useEffect(() => {
    console.log("Music Item:", props.mymusic);
  }, [props.mymusic]); 

  // Function to handle when the delete button is clicked
  const handleDeleteClick = () => {
    setShowConfirm(true); 
  };

  // Function to handle the actual deletion of the music item
  const handleDelete = () => {
    axios.delete('http://localhost:4000/api/music/' + props.mymusic._id)
      .then(() => {
        props.ReloadData(); 
        setShowConfirm(false); 
      })
      .catch((err) => {
        console.log("Error deleting music:", err); 
        setShowConfirm(false); 
      });
  };

  const handleClose = () => setShowConfirm(false); // Close the modal without deleting

  return (
    <div>
      <Card>
        <Card.Header>Music Title: {props.mymusic.title}</Card.Header> {/* Display Name */}
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>Artist: {props.mymusic.singer}</p> {/* Display singer */}
            <p>Publish Date: {props.mymusic.date}</p> {/* Display publish date */}
            <p>Poster: {props.mymusic.poster}</p> {/* Display poster text (if it's not an image) */}
          </blockquote>
        </Card.Body>        
        <Link to={"/edit/" + props.mymusic._id} className="btn btn-primary">Edit</Link>
        <Button className="btn btn-danger" onClick={handleDeleteClick}>Delete</Button>
      </Card>

      {/* Confirmation Modal for deleting the music item */}
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
