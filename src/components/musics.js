import MusicItem from "./musicitem";

const Music = (props) => {
    return (
      <div>
        {props.myMusic.map((music) => (
          <MusicItem
            mymusic={music}
            key={music._id}
            Reload={props.ReloadData}
          />
        ))}
      </div>
    );
  };
  
  export default Music;

