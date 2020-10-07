//axios获取相似mv
import store from "../store";
import axios from "axios";
export default (id) => {
  const state = store.getState();
  return axios.get(
    state.api + "/simi/mv?mvid=" + id,
  );
};
