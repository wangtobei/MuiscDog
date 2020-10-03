import React from "react";
import { Row, Col } from "antd";
import "../../axios/getNewSongInfo";
import getNewSongInfo from "../../axios/getNewSongInfo";
import getMusicUrl from "../../axios/getMusicUrl";
import MusicItem from "../musicitem";
import getMusicDetail from "../../axios/getMusicDetail";
import {
  ChangeCurrentMuiscUrl,
  ChangeCurrentMusicPic,
} from "../../store/actions/action";
class NewSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewSongInfo: [],
    };
  }
  componentDidMount() {
    getNewSongInfo().then((res) => {
      this.setState({
        NewSongInfo: res.data.result,
      });
    });
  }
  ChangeMuisc(id) {
    getMusicUrl(id).then((res) => {
     let MusicUrl = res.data.data[0].url;
      ChangeCurrentMuiscUrl(MusicUrl,"playing");
    });
    getMusicDetail(id).then((res) => {
      let MusicPic = res.data.songs[0].al.picUrl;
      ChangeCurrentMusicPic(MusicPic);
    });
  }
  render() {
    return (
      <div>
        <h2>新歌速推</h2>
        <Row>
          {this.state.NewSongInfo.map((item) => {
            return (
              <Col
                span={11}
                key={item.id}
                onClick={this.ChangeMuisc.bind(this, item.id)}
              >
                <MusicItem
                  picUrl={item.picUrl}
                  name={item.name}
                  artists={item.song.artists}
                ></MusicItem>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
export default NewSong;
