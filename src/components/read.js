//connect and gain data from music.js
import Music from "./musics";
import { useEffect, useState } from "react";
import axios from "axios";
//add a constant variable that holds the JSON data for music
function Read() {
  const [music, setMusic] = useState([]);
  useEffect(() => {
    // Fetching music data from the backend
    axios.get('http://localhost:4000/api/musics')  
      .then((response) => {
    
        setMusic(response.data);
      })
      .catch((error) => {
        console.log("Error fetching music:", error);
      });
  }, []); 
  return (
    //music added to connect and display data from music.js
    <div>
      <h2>This is my Read Component.</h2>
      <Music myMusic={music} />
    </div>
  );
}

export default Read;
