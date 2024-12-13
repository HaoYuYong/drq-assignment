import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    let {id} = useParams();
    const [title, setTitle] = useState('');
    const [singer, setSinger] = useState('');
    const [poster, setPoster] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/music/'+id)
        .then((res)=>{
            console.log("sucess "+res.data);
            setTitle(res.data.title);
            setSinger(res.data.singer);
            setPoster(res.data.poster);
        })
        .catch((err)=>{console.log(err)});
    },[id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const music = {title,singer,poster};
        console.log(music);

        axios.put('http://localhost:4000/api/music/'+id, music)
        .then((res)=>{
            console.log("Edited: "+res.data);
            navigate('/read');
        })
        .catch((err)=>{
            console.log(err);
        });
      
    }

    return (
        <div>
            <h3>Hello from edit component!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Music Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Music Singer: </label>
                    <input type="text"
                        className="form-control"
                        value={singer}
                        onChange={(e) => { setSinger(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Music Poster: </label>
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Edit Music"></input>
                </div>
            </form>
        </div>
    );
}
export default Edit;