import React from "react";
import { connect } from "react-redux";
import { Slider, Image } from "antd";
import {
  StepBackwardFilled,
  PlayCircleFilled,
  StepForwardFilled,
  PauseCircleFilled,
} from "@ant-design/icons";
import "./player.css";
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.Changevalue = this.Changevalue.bind(this);
    this.SetMusicDurtion = this.SetMusicDurtion.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.state = {
      PlayState: this.props.Status, //播放器的状态
      value: 0,
      duration: 0,
    };
  }
  //props改变后重新修改state的值 
  //下面这个生命周期函数官方不再推荐使用，我懒得改了  https://zhuanlan.zhihu.com/p/89494013
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    this.setState(
      {
        duration: duration,
      },
    );
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
              style={{ fontSize: "50px", color: "#1DA57A" }}
            />
            {ctrlbtn}
            <StepForwardFilled style={{ fontSize: "50px", color: "#1DA57A" }} />
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
  };
};
export default connect(stateToprops, null)(Player);
