import React from "react";
import "./head.css";
import { Input } from "antd";
import { withRouter } from "react-router-dom";
const { Search } = Input;
class Head extends React.Component {
  search(keywords) {
    this.props.history.push("/search/" + keywords);
  }
  render() {
    return (
      <div className="head">
        <span className="music">Music</span>
        <span className="dog">Dog</span>
        <Search
          placeholder="没事搜一搜~"
          onSearch={(keywords) => this.search(keywords)}
          className="search"
          enterButton
        />
      </div>
    );
  }
}
export default withRouter(Head);
