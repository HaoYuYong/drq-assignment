import MusicItem from "./musicitem";

const Music = (props) => {
  return props.myMusic.map((music) => {
    return <MusicItem mymusic={music} key={music._id} ReloadData={props.ReloadData} />; // Pass ReloadData to MusicItem
  });
};

export default Music;
