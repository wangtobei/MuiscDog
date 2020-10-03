import React from "react";
import "./musicitem.css";
import getMusicDetail from "../../axios/getMusicDetail";
import getMusicUrl from "../../axios/getMusicUrl";
import {
  ChangeCurrentMuiscUrl,
  ChangeCurrentMusicPic,
} from "../../store/actions/action";
class MusicItem extends React.Component {
  ChangeMusic(id) {
    console.log(id)
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
      <div className="musicitem"  onClick={this.ChangeMusic.bind(this,this.props.id)}>
        <div className="cover">
          <img src={this.props.picUrl} alt="图片走丢了~" className="cover"></img>
        </div>
        <div className="info">
          <div className="name">{this.props.name}</div>
          <div className="artists">
            {this.props.artists.map((item) => {
              return (
                <span className="artist" key={item.id}>
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default MusicItem;
