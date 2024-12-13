import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const MusicItem = (props) => {
  useEffect(() => {
    console.log("Music Item:", props.mymusic);
  }, [props.mymusic]); // Only run this effect when the mymusic prop changes

const handleDelete = (e)=>{
  e.preventDefault();
  axios.delete('http://localhost:4000/api/music/'+props.mymusic._id)
  .then(() => {
      props.Reload(); // Refresh the music list after deletion
  })
  .catch((err) => {
      console.log(err); //"Error deleting music:", error
  });
};

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
            <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
};

export default MusicItem;
