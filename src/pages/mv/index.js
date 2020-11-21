import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Row, Col, Card, Pagination } from "antd";
import getTopMv from "../../axios/getTopMv";
import "./mv.css";
class MvTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mvlist: [],
      currentpage: 0,
      mvcount: 0,
      area: "",
    };
    this.changeType = this.changeType.bind(this);
    this.changpage = this.changpage.bind(this);
  }
  componentDidMount() {
    getTopMv("全部", 0).then((res) => {
      this.setState({
        currentpage: 0,
        mvlist: res.data.data,
        mvcount: res.data.count,
      });
    });
  }
  changeType(area) {
    this.setState({
      area: area,
    });
    getTopMv(area, 0).then((res) => {
      this.setState({
        currentpage: 0,
        mvlist: res.data.data,
        mvcount: res.data.count,
      });
    });
  }
  gotoMvDeatails(id) {
    this.props.history.push("/mv/" + id);
  }
  changpage(page, pagesize) {
    this.setState({
      currentpage: page - 1,
    });
    getTopMv(this.state.area, page - 1).then((res) => {
      this.setState({
        mvlist: res.data.data,
      });
    });
  }
  render() {
    return (
      <div>
        <div className="mvtype">
          地区：
          <Button
            type="link"
            onClick={() => {
              this.changeType("全部");
            }}
          >
            全部
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changeType("内地");
            }}
          >
            内地
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changeType("港台");
            }}
          >
            港台
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changeType("欧美");
            }}
          >
            欧美
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changeType("日本");
            }}
          >
            日本
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changeType("韩国");
            }}
          >
            韩国
          </Button>
        </div>
        <Row>
          {this.state.mvlist.map((item) => {
            return (
              <Col key={item.id}
              className="mvitem"
              >
                <Card
                  onClick={this.gotoMvDeatails.bind(this, item.id)}
                  hoverable
                  cover={<img alt="" src={item.cover} className="mvcover" />}
                >
                  <span className="mvname">{item.name}</span>
                </Card>
              </Col>
            );
          })}
        </Row>
        <br />
        <Pagination
          current={this.state.currentpage + 1}
          total={this.state.mvcount}
          showSizeChanger={false}
          onChange={this.changpage}
        ></Pagination>
      </div>
    );
  }
}
export default withRouter(MvTop);
