import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import getRecommendSongSheet from "../../axios/getRecommendSongSheet";
import "./songsheet.css";
import { withRouter } from "react-router-dom";
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
  ShowSongSheetDetail(id) {
    this.props.history.push("/songsheet/" + id);
  }
  render() {
    return (
      <div className="songsheet">
        <h2>推荐歌单</h2>
        <Row>
          {this.state.SongSheetItem.slice(0, 10).map((item) => {
            return (
              <Col
                span={4}
                className="songsheetitem"
                key={item.id}
                onClick={this.ShowSongSheetDetail.bind(this, item.id)}
              >
                <Card
                  hoverable
                  cover={
                    <img alt={item.name} src={item.picUrl + "?param=600y600"} className="coverimg" />
                  }
                  className="songsheetcard"
                ><span className="songsheetname">{item.name}</span></Card>
                
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
export default withRouter(SongSheet);
