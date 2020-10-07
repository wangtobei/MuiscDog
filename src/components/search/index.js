import React, { Component } from "react";
import { Table } from "antd";
import search from "../../axios/search";
import "./search.css";
import getMusicUrl from "../../axios/getMusicUrl";
import getMusicDetail from "../../axios/getMusicDetail";
import {
  ChangeCurrentMuiscUrl,
  ChangeCurrentMusicPic,
} from "../../store/actions/action";
const columns = [
  {
    title: "歌曲",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "歌手",
    dataIndex: "artists",
    key: "artists",
    render: (artists) => {
      return artists.map((artist) => {
        return <span key={artist.id}>{artist.name} </span>;
      });
    },
  },
  {
    title: "专辑",
    dataIndex: "album",
    key: "album",
    render: (album) => {
      return <span>{album.name}</span>;
    },
  },
];
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      keywords: "",
      page: 0,
      songCount: 0,
    };
  }
  //再次搜索歌曲的时候修改了keywords 使用下面这个可以让数据重新渲染
  UNSAFE_componentWillReceiveProps(props) {
    if (props.match.params.keywords !== this.state.keywords) {
      let keywords = props.match.params.keywords;
      this.setState({
        keywords: keywords,
      });
      search(this.state.page, keywords).then((res) => {
        this.setState({
          data: res.data.result.songs,
          songCount: res.data.result.songCount,
        });
      });
    }
  }
  componentDidMount() {
    let keywords = this.props.match.params.keywords;
    this.setState({
      keywords: keywords,
    });
    search(this.state.page, keywords).then((res) => {
      this.setState({
        data: res.data.result.songs,
        songCount: res.data.result.songCount,
      });
    });
  }
  ChangeCurrentPage(page, pageSize) {
    this.setState({
      page: page - 1,
    });
    search(this.state.page, this.state.keywords).then((res) => {
      this.setState({
        data: res.data.result.songs,
      });
    });
  }
  ChangeMuisc(id) {
    getMusicUrl(id).then((res) => {
      let MusicUrl = res.data.data[0].url;
      ChangeCurrentMuiscUrl(MusicUrl, "playing");
    });
    getMusicDetail(id).then((res) => {
      let MusicPic = res.data.songs[0].al.picUrl;
      ChangeCurrentMusicPic(MusicPic);
    });
  }
  render() {
    return (
      <div className="searcharea">
        <h2>
          找到{this.state.songCount}个关于"{this.state.keywords}"的结果
        </h2>
        <Table
          columns={columns}
          dataSource={this.state.data}
          size="small"
          rowKey="id"
          pagination={{
            defaultCurrent:1,
            defaultPageSize: 20,
            onChange: this.ChangeCurrentPage.bind(this),
            total: this.state.songCount,
            showSizeChanger: false,
            position: ["bottomCenter"],
          }}
          onRow={(record) => {
            return {
              onClick: (event) => {
                this.ChangeMuisc(record.id);
              },
            };
          }}
        ></Table>
      </div>
    );
  }
}
export default Search;
