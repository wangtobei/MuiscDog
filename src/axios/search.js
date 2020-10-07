//axios获取搜索结果
import store from "../store";
import axios from "axios";
export default (page, keywords) => {
  const state = store.getState();
  return axios.get(
    state.api + "/search?offset=" + page*20 + "&&limit=20&&keywords=" + keywords
  );
};
