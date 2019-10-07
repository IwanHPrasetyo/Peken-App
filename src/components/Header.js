import React, { Component } from "react";
import Navbars from "./Navbars";
import Togglenavbars from "./Togglenavbars";
import Navbarschck from "./Navbarschck";

export default class Header extends Component {
  render() {
    return (
      <div><div className="p-0 m-0 bg-info rounded">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1 m-0 p-0 shadow"><Togglenavbars/></div>
            <div className="col-md-8 m-0 p-0 shadow" ><Navbars/></div>
            <div className="col-md-3 m-0 p-0 shadow"><Navbarschck/></div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
