//axios获取mv排行信息
import store from "../store";
import axios from "axios";
export default (area, offset) => {
  const state = store.getState();
  return axios.get(state.api + "/mv/all?limit=20&offset="+offset*20+"&area="+area);
};
/*
说明 : 调用此接口 , 可获取 mv 排行

可选参数 : limit: 取出数量 , 默认为 30

area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0

接口地址 : /top/mv

调用例子 : /top/mv?limit=10
*/
