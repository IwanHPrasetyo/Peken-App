import React, { Component } from "react";

export default class Togglenavbars extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-info text-center">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    );
  }
}
