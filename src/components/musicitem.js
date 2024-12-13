import { useEffect } from "react";
import Card from 'react-bootstrap/Card';

const MusicItem = (props) => {
  useEffect(() => {
    console.log("Music Item:", props.mymusic);
  }, [props.mymusic]); // Only run this effect when the mymusic prop changes

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
      </Card>
    </div>
  );
};

export default MusicItem;
