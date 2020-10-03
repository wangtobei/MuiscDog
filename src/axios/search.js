//axios获取搜索
import store from "../store";
import axios from "axios";
export default (page, keywords) => {
  console.log("搜索")
  const state = store.getState();
  return axios.get(
    state.api + "/search?offset=" + page + "&&limit=20&&keywords=" + keywords
  );
};
