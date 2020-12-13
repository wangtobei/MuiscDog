import { Menu } from "antd";
import React, { Component } from "react";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  GithubOutlined
} from "@ant-design/icons";
import "./menu.css";
import { NavLink } from "react-router-dom";

class MyMenu extends Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          inlineCollapsed={this.state.collapsed}
          className="menu"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/">发现音乐</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to="/songsheet">推荐歌单</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <NavLink to="/mv">精品MV</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<GithubOutlined />}>
              <a href="https://github.com/wangtobei/MusicDog" target="_blank" rel="noopener noreferrer">开源地址</a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default MyMenu;
