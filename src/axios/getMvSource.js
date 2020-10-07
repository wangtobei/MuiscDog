//axios获取mv播放链接
import store from "../store";
import axios from "axios";
export default (id) => {
  const state = store.getState();
  return axios.get(state.api + "/mv/url?id=" + id);
};
