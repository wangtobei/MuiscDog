import React, { Component } from "react";
import getSongSheetDetails from "../../axios/getSongSheetDetails";
import MusicItem from "../musicitem";
import { Row, Col, Spin } from "antd";
import "./songsheet.css";
class SongSheetDeatail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsheet: null,
      songs: [],
      loading: true,
    };
  }
  componentDidMount() {
    let songsheetid = this.props.match.params.songsheetid;
    getSongSheetDetails(songsheetid).then((res) => {
      this.setState({
        songsheet: res.songsheet,
        songs: res.songs,
      });
    });
    setTimeout(()=>{
        this.setState({
            loading: false,
        })
    },2000)
  }
  render() {
    return (
      <div className="songsheetdetails">
        <Spin tip="Loading..." spinning={this.state.loading} size="large" className="example">
        
          <Row>
            {
            this.state.songs.map((item) => {
              return (
                <Col span={12} key={item.id}>
                  <MusicItem
                    id={item.id}
                    picUrl={item.al.picUrl}
                    name={item.name}
                    artists={item.ar}
                  ></MusicItem>
                </Col>
              );
            })
            }
          </Row>
          </Spin>
      </div>
    );
  }
}
export default SongSheetDeatail;
