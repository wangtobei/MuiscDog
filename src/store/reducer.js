const DefaultStore = {
  api: "https://api.mtnhao.com",
  CurrentMusicUrl: "",
  CurrentMusicPic: "",
  CurrentStatus: "pause",
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
    default:
      return state;
  }
};
