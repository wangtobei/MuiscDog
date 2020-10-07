//axios获取mv详情
import store from "../store";
import axios from "axios";
export default (id) => {
  const state = store.getState();
  return axios.get(
    state.api + "/mv/detail?mvid=" + id,
  );
};
