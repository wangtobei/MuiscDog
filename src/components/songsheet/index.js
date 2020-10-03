import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import getRecommendSongSheet from "../../axios/getRecommendSongSheet";
import "./songsheet.css";
class SongSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SongSheetItem: [],
    };
  }
  componentDidMount() {
    getRecommendSongSheet().then((res) => {
      this.setState({
        SongSheetItem: res.data.result,
      });
    });
  }
  render() {
    return (
      <div className="songsheet">
          <h2>推荐歌单</h2>
        <Row>
          {this.state.SongSheetItem.slice(0, 10).map((item) => {
            return (
              <Col span={4} className="songsheetitem" key={item.id}>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.picUrl} />}
                  className="songsheetcard"
                ></Card>
                <span className="songsheetname">{item.name}</span>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
export default SongSheet;
