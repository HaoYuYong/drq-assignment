import Music from "./musics";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import './readCSS.css'; // Import the CSS for styling

function Read() {
  const [music, setMusic] = useState([]); // State to hold the music data
  const [showModal, setShowModal] = useState(false); // State to control the delete confirmation modal
  const [musicToDelete, setMusicToDelete] = useState(null); // State to store the ID of the music to be deleted

  // Function to reload the music data
  const Reload = () => {
    console.log("Reloading music data...");
    axios
      .get("http://localhost:4000/api/musics") // Sending a GET request to fetch musics from the server
      .then((response) => {
        setMusic(response.data); // Update the state with the fetched data
        console.log("Music data reloaded:", response.data);
      })
      .catch((error) => {
        console.error("Error reloading data:", error); // Logging any errors
      });
  };

  // Function to handle the delete button click
  const handleDeleteClick = (id) => {
    setMusicToDelete(id); // Store the ID of the music to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  // Function to confirm the delete action
  const confirmDelete = () => {
    if (!musicToDelete) return; // If no music selected for deletion, do nothing
    console.log(`Deleting music with id: ${musicToDelete}`);
    
    axios
      .delete(`http://localhost:4000/api/music/${musicToDelete}`) // Send DELETE request to the server
      .then((response) => {
        console.log("Music deleted successfully:", response);
        setShowModal(false); // Close the modal after successful delete
        // Remove the deleted item from the state
        setMusic(music.filter(item => item._id !== musicToDelete)); 
        setMusicToDelete(null); // Clear the musicToDelete state
      })
      .catch((error) => {
        console.error("Error deleting music:", error);
      });
  };

  // Function to cancel the delete action
  const cancelDelete = () => {
    setShowModal(false); // Close the modal
    setMusicToDelete(null); // Clear the musicToDelete state
  };

  // Fetch music data on component mount
  useEffect(() => {
    Reload(); // Call the Reload function to ensure data is loaded when the component mounts
  }, []); // Empty dependency array ensures it runs once when the component is mounted

  return (
    <div className="read-container">
      <h2 className="read-title">Music List</h2>
      <div className="music-list">
        {music.map((item) => (
          <div className="music-item" key={item._id}>
            <div className="music-info">
              <div className="music-name">
                <strong>Name:</strong> {item.title}
              </div>
              <div className="music-singer">
                <strong>Singer:</strong> {item.singer}
              </div>
              <div className="music-date">
                <strong>Date:</strong> {item.date}
              </div>
            </div>
            <div className="music-poster">
              <strong>Poster:</strong>
              <div className="poster-preview">
                <img src={item.poster} alt={item.title} />
              </div>
            </div>

            {/* Action Buttons - Edit & Delete */}
            <div className="music-actions">
              <button
                className="btn btn-warning"
                onClick={() => window.location.href = `/edit/${item._id}`}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteClick(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this music item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Read;