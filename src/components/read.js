//connect and gain data from music.js
import Music from "./musics";
import { useEffect, useState } from "react";
import axios from "axios";

//add a constant variable that holds the JSON data for music
function Read() {
  const [music, setMusic] = useState([]); // State to hold the music data

  const Reload = () => {
    console.log("Reloading music data...");
    axios.get('http://localhost:4000/api/musics') // Sending a GET request to fetch musics from the server
      .then((response) => {
        setMusic(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error reloading data:", error); // Logging any errors
      });
  };

  useEffect(() => {
    // Fetch music data on component mount
    Reload(); // You can call the Reload function here to ensure data is loaded when the component mounts
  }, []); // Empty dependency array ensures it runs once when the component is mounted

  return (
    //music added to connect and display data from music.js
    <div>
      <h2>This is my Read Component.</h2>
      <Music myMusic={music} ReloadData={Reload}/>
    </div>
  );
}

export default Read;
