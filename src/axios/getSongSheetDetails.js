//axios获取歌单详情
import store from "../store";
import axios from "axios";
import getMusicDetail from "./getMusicDetail";
export default function (id) {
  const state = store.getState();
  let songsid = [];
  let songs = [];
  let songsheet = null;
  return axios.get(state.api + "/playlist/detail?id=" + id).then((res) => {
    songsheet = res.data.playlist;
    songsheet.trackIds.map((item) => {
      songsid.push(item.id);
    });
    return getMusicDetail(songsid).then((res) => {
      songs = res.data.songs;
      return {songsheet,songs}
    });
  });
}
