import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import Search from "./components/search";
import "./index.css";
import "./index.less";
import Menu from "./components/Menu";
import Head from "./components/head";
import Player from "./components/player";
import store from "./store";
import SongSheetDetail from "./components/songsheet/detail";
import MvDetail from "./components/mvdetail";
import MvTop from "./pages/mv";
import SongSheet from "./pages/songsheet";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <div>
    <Router>
      <Head></Head>
      <Menu></Menu>
      <div className="main">
        <Route path="/" component={Home} exact></Route>
        <Route path="/search/:keywords" component={Search} exact></Route>
        <Route path="/songsheet/:songsheetid" component={SongSheetDetail} exact></Route>
        <Route path="/mv/:mvid" component={MvDetail} exact></Route>
        <Route path="/mv/" component={MvTop} exact></Route>
        <Route path="/songsheet/" component={SongSheet} exact></Route>
      </div>
      <Provider store={store}>
        <Player></Player>
      </Provider>
    </Router>
  </div>,
  document.getElementById("root")
);
