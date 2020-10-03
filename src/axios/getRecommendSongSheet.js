//axios获取推荐歌单信息
import store from "../store";
import axios from "axios";
export default () => {
  const state = store.getState();
  return axios.get(state.api + "/personalized");
};
