import React, { useState } from "react";
import { Drawer } from "antd";
import { ProfileFilled } from "@ant-design/icons";
import getMusicDetail from "../../axios/getMusicDetail";
import getMusicUrl from "../../axios/getMusicUrl";
import {
  ChangeCurrentMuiscUrl,
  ChangeCurrentMusicPic,
  ChangeSongIndex,
} from "../../store/actions/action";
import "./player.css";
export default function Songlist(props) {
  const [visible, setVisible] = useState(false);
  const [List, setList] = useState([]);
  const showDrawer = () => {
    setVisible(true);
    //打开抽屉组件以后重新获取最新的数据
    if (props.songlist.length > 0) {
      getMusicDetail(props.songlist).then((res) => {
        setList(res.data.songs);
      });
    }
  };
  const onClose = () => {
    setVisible(false);
  };
  //改变当前播放的音乐
  const changmusic = (id, index) => {
    getMusicUrl(id).then((res) => {
      let MusicUrl = res.data.data[0].url;
      ChangeCurrentMuiscUrl(MusicUrl, "playing");
    });
    getMusicDetail(id).then((res) => {
      let MusicPic = res.data.songs[0].al.picUrl;
      ChangeCurrentMusicPic(MusicPic);
    });
    ChangeSongIndex(index);
  };
  return (
    <>
      <ProfileFilled
        onClick={showDrawer}
        style={{ fontSize: "40px", color: "#1DA57A", marginLeft: "100px" }}
      />
      <Drawer
        title="音乐列表"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {List.map((item, index) => {
          if (index === props.currentindex)
            return (
              <div
                style={{ color: "green" }}
                className="listitem"
                key={item.id + index}
              >
                {item.name}
              </div>
            );
          else
            return (
              <div
                className="listitem"
                key={item.id + index}
                onClick={()=>{changmusic(item.id, index)}}
              >
                {item.name}
              </div>
            );
        })}
      </Drawer>
    </>
  );
}
