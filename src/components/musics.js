import MusicItem from "./musicitem";

const Music = (props)=>{
  return props.myMusic.map(
      (music)=>{
          return <MusicItem mymusic={music} key={music._id} Reload={props.ReloadData} deleteMusic={props.deleteMusic}/>
      }
  );
}
  
export default Music;

