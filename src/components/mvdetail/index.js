import React, { Component } from "react";
import getMvDetail from "../../axios/getMvDetail";
import getMvSource from "../../axios/getMvSource";
import getSimilarMv from "../../axios/getSimilarMv";
import { withRouter } from "react-router-dom";
import { Card, Row, Col } from "antd";
import "./mvdetail.css";
class MvDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mvdetails: {
        artistName: "",
        name: "",
      },
      mvsource: "",
      similar: [],
    };
  }
  componentDidMount() {
    let mvid = this.props.match.params.mvid;
    getMvDetail(mvid).then((res) => {
      this.setState({
        mvdetails: res.data.data,
      });
    });
    getMvSource(mvid).then((res) => {
      this.setState({
        mvsource: res.data.data.url,
      });
    });
    getSimilarMv(mvid).then((res) => {
      this.setState({
        similar: res.data.mvs,
      });
    });
  }
  gotoMvDeatails(id) {
    this.props.history.push("/mv/" + id);
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (this.props.match.params.mvid !== props.match.params.mvid) {
      let mvid = props.match.params.mvid;
      getMvDetail(mvid).then((res) => {
        this.setState({
          mvdetails: res.data.data,
        });
      });
      getMvSource(mvid).then((res) => {
        this.setState({
          mvsource: res.data.data.url,
        });
      });
      getSimilarMv(mvid).then((res) => {
        this.setState({
          similar: res.data.mvs,
        });
      });
    }
  }
  render() {
    return (
      <div>
        <div>
          <div  className="videoplayer">
            <video
              src={this.state.mvsource}
              className="videoplayer"
              controls
            ></video>
            <h2>
              {this.state.mvdetails.name}——{this.state.mvdetails.artistName}
            </h2>
            <span style={{marginRight:'30px'}}>
                发布：{this.state.mvdetails.publishTime}
            </span>
            <span>
                播放{this.state.mvdetails.playCount}次
            </span>
          </div>
          <div className="similarmv">
            <h2>相似MV</h2>
            <Row>
              {this.state.similar.slice(0, 3).map((item) => {
                return (
                  <Col span={24} key={item.id}>
                    <Card
                      className="similarmvitem"
                      hoverable
                      cover={<img src={item.cover} alt="图片走丢了~" />}
                      onClick={this.gotoMvDeatails.bind(this, item.id)}
                    ></Card>
                    <span>{item.name}</span>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(MvDetail);
