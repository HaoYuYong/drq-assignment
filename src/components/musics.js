import MusicItem from "./musicitem";

const Music = (props) => {
  // The component returns a list of MusicItem components by mapping over 'props.myMusic'
  return props.myMusic.map((music) => {
    return <MusicItem mymusic={music} key={music._id} ReloadData={props.ReloadData} />; // Pass ReloadData to MusicItem
  });
};

export default Music;
