//axios获取歌单排行信息
import store from "../store";
import axios from "axios";
export default (order, cat, offset) => {
  const state = store.getState();
  return axios.get(
    state.api +
      "/top/playlist?limit=15&order=" +
      order +
      "&cat=" +
      cat +
      "&offset=" +
      offset * 15
  );
};
/**
 * 说明 : 调用此接口 , 可获取网友精选碟歌单

可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

limit: 取出歌单数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

接口地址 : /top/playlist

调用例子 : /top/playlist?limit=10&order=new

 */
