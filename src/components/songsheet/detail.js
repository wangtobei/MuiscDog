import React, { Component } from "react";
import getSongSheetDetails from "../../axios/getSongSheetDetails";
import MusicItem from "../musicitem";
import { Row, Col, Spin, Pagination, Image, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./songsheet.css";
class SongSheetDeatail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsheet: {
        coverImgUrl: "",
        name: "",
        creator: {
          avatarUrl: "",
          nickname: "",
        },
        tags: [],
        description: "",
      },
      songs: [],
      loading: true,
      currentpage: 1,
      perpagesize: 10,
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
    //定时器loading图标显示  内行内行
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 300);
  }
  ChangePage(page, pagesize) {
    this.setState({
      currentpage: page,
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 300);
  }
  render() {
    let { currentpage, perpagesize } = this.state;
    return (
      <div className="songsheetdetails">
        <div className="songsheethead">
          <Image
            src={this.state.songsheet.coverImgUrl}
            className="coverimg"
          ></Image>
          <div className="detailsongheetname">{this.state.songsheet.name}</div>
          <Avatar
            size={30}
            icon={<UserOutlined />}
            src={this.state.songsheet.creator.avatarUrl}
          />
          <span>{this.state.songsheet.creator.nickname}创建的歌单</span>
          <div className="songsheetdetailtag">
            标签：
            {this.state.songsheet.tags.map((item) => {
              return <span key={item} className="songsheetdetailtags">{item}</span>;
            })}
          </div>
          <div>简介：{this.state.songsheet.description}</div>
        </div>
        <Divider></Divider>
        <Spin
          tip="Loading..."
          spinning={this.state.loading}
          size="large"
          className="example"
        >
          <Row>
            {this.state.songs
              .slice((currentpage - 1) * perpagesize, currentpage * perpagesize)
              .map((item) => {
                return (
                  <Col span={11} key={item.id}>
                    <MusicItem
                      id={item.id}
                      picUrl={item.al.picUrl}
                      name={item.name}
                      artists={item.ar}
                    ></MusicItem>
                  </Col>
                );
              })}
          </Row>
          <Pagination
            total={this.state.songs.length}
            showSizeChanger={false}
            onChange={this.ChangePage.bind(this)}
            className="pagination"
          />
        </Spin>
      </div>
    );
  }
}
export default SongSheetDeatail;
