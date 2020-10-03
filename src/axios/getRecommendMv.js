//axios获取推荐MV
import store from "../store";
import axios from "axios";
export default () => {
  const state = store.getState();
  return axios.get(state.api + "/personalized/mv");
};
