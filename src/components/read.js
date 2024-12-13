//connect and gain data from music.js
import Music from "./musics";
import { useEffect, useState } from "react";
import axios from "axios";

//add a constant variable that holds the JSON data for music
function Read() {
  //const [data, setData] = useState([]);// To store the raw data from the API 
  const [music, setMusic] = useState([]);
  const Reload = () => {
    console.log("Reloading music data...");
    axios.get('http://localhost:4000/api/musics')// Sending a GET request to fetch musics from the server
        .then((response) => {
            setMusic(response.data); // Setting the received data into the state (data)
        })
        .catch((error) => {
            console.error("Error reloading data:", error);// Logging any errors that occur during the request
        });
};

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
      <Music myMusic={music} ReloadData={Reload}/>
    </div>
  );
}

export default Read;
