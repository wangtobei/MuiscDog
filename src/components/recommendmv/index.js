import React, { Component } from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
import getRecommendMv from "../../axios/getRecommendMv";
import "./recommendmv.css";
import { withRouter } from "react-router-dom";
class RecMv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RecMv: [],
    };
  }
  componentDidMount() {
    getRecommendMv().then((res) => {
      this.setState({
        RecMv: res.data.result,
      });
    });
  }
  gotoMvDeatails(id) {
    this.props.history.push("/mv/" + id);
  }
  render() {
    return (
      <div className="recommendmv">
        <h2>推荐mv</h2>
        <Row>
          {this.state.RecMv.map((item) => {
            return (
              <Col span={5} key={item.id} className="recommendmvitem">
                <Card
                  hoverable
                  cover={<img src={item.picUrl} alt="图片走丢了~" />}
                  className="recommendcard"
                  onClick={this.gotoMvDeatails.bind(this,item.id)}
                > <span className="recommendname">{item.name}</span></Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
export default withRouter(RecMv);
