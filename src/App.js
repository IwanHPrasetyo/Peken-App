import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
require("dotenv/config");

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid pl-0 pr-0 overflow-hidden">
          <Router>
            <Route path={"/home"} component={Home} />
            <Route path={"/"} component={Login} />
          </Router>
        </div>
      </div>
    );
  }
}
