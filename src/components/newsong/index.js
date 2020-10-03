import React from "react";
import { Row, Col } from "antd";
import "../../axios/getNewSongInfo";
import getNewSongInfo from "../../axios/getNewSongInfo";

import MusicItem from "../musicitem";

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
              >
                <MusicItem
                  id={item.id}
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
