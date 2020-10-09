import React from "react";
import getMusicDetail from "../../axios/getMusicDetail";
import getMusicUrl from "../../axios/getMusicUrl";
import {
  ChangeCurrentMuiscUrl,
  ChangeCurrentMusicPic,
  ChangeSongIndex,
} from "../../store/actions/action";
import { connect } from "react-redux";
import { Slider, Image } from "antd";
import {
  StepBackwardFilled,
  PlayCircleFilled,
  StepForwardFilled,
  PauseCircleFilled,
} from "@ant-design/icons";
import "./player.css";
import Songlist from "./songlist";
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.Changevalue = this.Changevalue.bind(this);
    this.SetMusicDurtion = this.SetMusicDurtion.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.NextSong = this.NextSong.bind(this);
    this.PreSong = this.PreSong.bind(this);
    this.state = {
      PlayState: this.props.Status, //播放器的状态
      value: 0,
      duration: 0,
      songindex: this.props.SongIndex,
    };
  }
  //更新当前播放的音乐的信息
  updatemusicinfo(newindex) {
    let id = this.props.SongList[newindex];
    getMusicUrl(id).then((res) => {
      let MusicUrl = res.data.data[0].url;
      ChangeCurrentMuiscUrl(MusicUrl, "playing");
    });
    getMusicDetail(id).then((res) => {
      let MusicPic = res.data.songs[0].al.picUrl;
      ChangeCurrentMusicPic(MusicPic);
    });
  }
  //播放下一首
  NextSong() {
    let newindex = 0;
    if (this.state.songindex < this.props.SongList.length - 1)
      newindex = this.state.songindex + 1;
    this.updatemusicinfo(newindex);
    this.setState({
      songindex: newindex,
    });
    ChangeSongIndex(newindex);
  } //播放上一首
  PreSong() {
    let newindex = this.props.SongList.length - 1;
    if (this.state.songindex > 0) newindex = this.state.songindex - 1;
    this.updatemusicinfo(newindex);
    this.setState({
      songindex: newindex,
    });
    ChangeSongIndex(newindex);
  }
  //props改变后重新修改state的值
  //下面这个生命周期函数官方不再推荐使用，我懒得改了  https://zhuanlan.zhihu.com/p/89494013
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.SongIndex !== this.state.songindex) {
      this.setState({
        songindex: nextProps.SongIndex,
      });
    }
    if (nextProps.Status !== this.state.PlayState) {
      this.setState({
        PlayState: nextProps.Status,
      });
    }
  }
  //进度条修改音乐进度
  HandleChange = (value) => {
    this.refs.audio.currentTime = value * this.state.duration;
  };
  //音乐自动更新进度
  Changevalue(value) {
    let currentTime = value.target.currentTime;
    this.setState({
      value: currentTime / this.state.duration,
    });
  }
  //播放
  Play() {
    this.setState({
      PlayState: "playing",
    });
    this.refs.audio.play();
  }
  //暂停
  Pause() {
    this.setState({
      PlayState: "pause",
    });
    this.refs.audio.pause();
  }
  //设置当前歌曲的长度
  SetMusicDurtion(res) {
    let duration = res.target.duration;
    this.setState({
      duration: duration,
    });
  }
  render() {
    let ctrlbtn = null;
    if (this.state.PlayState === "pause") {
      ctrlbtn = (
        <PlayCircleFilled
          style={{ fontSize: "50px", color: "#1DA57A" }}
          onClick={this.Play.bind(this)}
        />
      );
    } else {
      ctrlbtn = (
        <PauseCircleFilled
          style={{ fontSize: "50px", color: "#1DA57A" }}
          onClick={this.Pause.bind(this)}
        />
      );
    }
    return (
      <div className="player">
        <audio
          ref="audio"
          src={this.props.MuiscUrl}
          autoPlay
          onTimeUpdate={this.Changevalue}
          onLoadedMetadata={this.SetMusicDurtion}
          onEnded={this.NextSong}
        ></audio>
        <div>
          <Slider
            tipFormatter={null}
            onChange={this.HandleChange}
            value={this.state.value}
            min={0}
            max={1}
            step={0.001}
          />
          <Image className="musicimg" src={this.props.MusicPic} />
          <div className="ctrlbtn">
            <StepBackwardFilled
              onClick={this.PreSong}
              style={{ fontSize: "50px", color: "#1DA57A" }}
            />
            {ctrlbtn}
            <StepForwardFilled
              style={{ fontSize: "50px", color: "#1DA57A" }}
              onClick={this.NextSong}
            />
            <Songlist
              songlist={this.props.SongList}
              currentindex={this.state.songindex}
            />
          </div>
        </div>
      </div>
    );
  }
}
//使用了react-redux 可以更加方便的与redux结合
const stateToprops = (state) => {
  return {
    MuiscUrl: state.CurrentMusicUrl,
    MusicPic: state.CurrentMusicPic,
    Status: state.CurrentStatus,
    SongList: state.SongList,
    SongIndex: state.SongIndex,
  };
};
export default connect(stateToprops, null)(Player);
