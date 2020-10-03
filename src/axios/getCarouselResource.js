//axios获取首页banner
import store from "../store";
import axios from "axios";
export default () => {
  const state = store.getState();
  return axios.get(state.api + "/banner?type=0");
};
