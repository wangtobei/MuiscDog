//axios获取歌曲播放链接
import store from "../store";
import axios from "axios";
export default (id) => {
  const state = store.getState();
  return axios.get(state.api + "/song/url?id=" + id);
};
