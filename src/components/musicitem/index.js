import React from "react";
import "./musicitem.css";
function MusicItem(props) {
  return (
    <div className="musicitem">
      <div className="cover">
        <img src={props.picUrl} alt="图片走丢了~" className="cover"></img>
      </div>
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="artists">
          {
          props.artists.map((item) => {
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
export default MusicItem;
