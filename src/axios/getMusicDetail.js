//axios获取歌曲详情
import store from "../store";
import axios from "axios";
export default (id) => {
  const state = store.getState();
  return axios.get(state.api + "/song/detail?ids=" + id);
};
