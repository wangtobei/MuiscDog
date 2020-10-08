//axios获取hightqualitysongsheet
import store from "../store";
import axios from "axios";
export default (cat) => {
  const state = store.getState();
  return axios.get(state.api + "/top/playlist/highquality?limit=1&cat=" + cat);
};
