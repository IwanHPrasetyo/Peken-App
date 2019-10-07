import React, { Component } from "react";
import Register from "./Register";
// import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: data
    })
      .then(res => {
        console.log(res.data);

        //window.location.href = "./home";
        alert(
          "<div className='alert alert-success' role='alert'>Sukses Login</div>"
        );
      })
      .catch(err => {
        console.log(err);
        alert("Error Loading in please try again");
      });
  };

  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container-fluid">
            <div className="row" style={{ height: "695px" }}>
              <div className="col h-100">
                <form
                  onSubmit={this.handleSubmit}
                  className="form-signin text-center"
                  style={{
                    width: "20%",
                    marginLeft: "500px",
                    marginTop: "50px"
                  }}
                >
                  <img
                    className="mb-4"
                    src="http://localhost:5000/public/images/carrot-icon.jpeg"
                    alt="img"
                    style={{ width: "72px", height: "72px" }}
                  />
                  <h1 className="h3 mb-3 font-weight-bold">Sign in</h1>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    // required
                    // autofocus
                  />
                  <br />
                  <label htmlFor="pass" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="pass"
                    name="pass"
                    className="form-control"
                    placeholder="Password"
                    // required
                  />
                  <br />
                  <div className="checkbox mb-3">
                    <label>
                      <input type="checkbox" defaultValue="remember-me" />{" "}
                      Remember me
                    </label>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block">
                    Sign in
                  </button>
                </form>
                <button
                  className="btn btn-lg btn-info btn-block mt-2"
                  style={{ width: "255px", marginLeft: "500px" }}
                  data-toggle="modal"
                  data-target="#modalRegister"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <Register />
      </div>
    );
  }
}

export default Login;
