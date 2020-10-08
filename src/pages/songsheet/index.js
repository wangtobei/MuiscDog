import React, { Component } from "react";
import getTopSongSheet from "../../axios/getTopSongSheet";
import getHighqualitysongsheet from "../../axios/getHighqualitysongsheet";
import { Button, Row, Col, Card, Pagination, Image } from "antd";
import "../../components/songsheet/songsheet.css";
import "./songsheet.css";
export default class SongSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsheetlist: [],
      count: 0,
      currentpage: 0,
      type: "",
      highquality: [
        {
          coverImgUrl: "",
          description: "",
        },
      ],
    };
    this.changesongsheettype = this.changesongsheettype.bind(this);
    this.changepage = this.changepage.bind(this);
  }
  componentDidMount() {
    getHighqualitysongsheet("全部").then((res) => {
      this.setState({
        highquality: res.data.playlists,
      });
    });
    getTopSongSheet("new", "全部", 0).then((res) => {
      this.setState({
        songsheetlist: res.data.playlists,
        count: res.data.total,
        type: "全部",
      });
    });
  }
  changesongsheettype(type) {
    getHighqualitysongsheet(type).then((res) => {
      this.setState({
        highquality: res.data.playlists,
      });
    });
    getTopSongSheet("new", type, 0).then((res) => {
      this.setState({
        songsheetlist: res.data.playlists,
        count: res.data.total,
        currentpage: 0,
        type: type,
      });
    });
  }
  ShowSongSheetDetail(id) {
    this.props.history.push("/songsheet/" + id);
  }
  changepage(page, pagesize) {
    getTopSongSheet("new", this.state.type, page).then((res) => {
      this.setState({
        songsheetlist: res.data.playlists,
        count: res.data.total,
        currentpage: page - 1,
      });
    });
  }
  render() {
    return (
      <div>
        <div className="highquality">
          <Image
            src={this.state.highquality[0].coverImgUrl}
            className="highqualitysongsheetcover"
          ></Image>
          <div className="highqualitytitle">
            {this.state.highquality[0].name}
          </div>
          <div className="qualitydesc">
            {this.state.highquality[0].description}
          </div>
        </div>
        <div>
          分类：
          <Button
            type="link"
            onClick={() => {
              this.changesongsheettype("全部");
            }}
          >
            全部
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changesongsheettype("华语");
            }}
          >
            华语
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changesongsheettype("古风");
            }}
          >
            古风
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changesongsheettype("欧美");
            }}
          >
            欧美
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.changesongsheettype("流行");
            }}
          >
            流行
          </Button>
        </div>
        <Row>
          {this.state.songsheetlist.map((item) => {
            return (
              <Col
                key={item.id}
                className="songsheetitem"
                onClick={this.ShowSongSheetDetail.bind(this, item.id)}
              >
                <Card
                  hoverable
                  className="songsheetcard"
                  cover={
                    <img
                      src={item.coverImgUrl + "?param120y120"}
                      alt="图片走丢了~"
                      className="cardimg"
                    />
                  }
                ></Card>
                <span className="songsheetname">{item.name}</span>
              </Col>
            );
          })}
        </Row>
        <br></br>
        <Pagination
          current={this.state.currentpage + 1}
          total={this.state.count}
          showSizeChanger={false}
          onChange={this.changepage}
          className="pagination"
        />
      </div>
    );
  }
}
