const DefaultStore = {
  api: "https://api.mtnhao.com",
  CurrentMusicUrl: "",
  CurrentMusicPic: "",
  CurrentStatus: "pause",
  SongList: [],
  SongIndex: 0,
};
export default (state = DefaultStore, action) => {
  let NewStore = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "ChangeCurrentMuiscUrl":
      NewStore.CurrentMusicUrl = action.CurrentMusicUrl;
      NewStore.CurrentStatus = action.CurrentStatus;
      return NewStore;
    case "ChangeCurrentMusicPic":
      NewStore.CurrentMusicPic = action.CurrentMusicPic;
      return NewStore;
    case "AddMusicToList": //添加新的音乐 且当前播放的音乐就是最新的
      let index = state.SongList.indexOf(action.MusicId);
      if (index === -1) {
        NewStore.SongList.push(action.MusicId);
        NewStore.SongIndex = NewStore.SongList.length - 1;
      } else {
        NewStore.SongIndex = index;
      }
      return NewStore;
    case "ChangeSongIndex":
      NewStore.SongIndex = action.SongIndex;
      return NewStore;
    default:
      return state;
  }
};
