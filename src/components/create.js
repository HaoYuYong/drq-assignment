import axios from "axios";
import { useState } from "react"

const Create = () => {
    
    const [title, setTitle] = useState('');
    const [singer, setSinger] = useState('');
    const [poster, setPoster] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        const music = {title,singer,poster};
        console.log('Music to be sent:', music);

        axios.post('http://localhost:4000/api/musics',music)
        .then((res)=>{console.log(res.data)})
        .catch((error) => console.error('Error:', error)); // Log the error
    }
    
    return(
        <div>
            <h3>Hello from create component</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Music: </label>
                    <input 
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Singer: </label>
                    <input 
                    type="text"
                    className="form-control"
                    value={singer}
                    onChange={(e) => { setSinger(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Music Poster: </label>
                    <input 
                    type="text"
                    className="form-control"
                    value={poster}
                    onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Music"></input>
                </div>
            </form>
        </div>
    )
}
export default Create;