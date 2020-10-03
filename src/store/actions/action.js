import store from "../index";
export const ChangeCurrentMuiscUrl = (MusicUrl,CurrentStatus) => {
  const action = {
    type: "ChangeCurrentMuiscUrl",
    CurrentMusicUrl: MusicUrl,
    CurrentStatus:CurrentStatus
  };
  store.dispatch(action);
};
export const ChangeCurrentMusicPic=(MusicPic)=>{
  const action = {
    type: "ChangeCurrentMusicPic",
    CurrentMusicPic: MusicPic,
  };
  store.dispatch(action);
}