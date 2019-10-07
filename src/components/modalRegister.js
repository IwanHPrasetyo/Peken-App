import React, { Component } from "react";

export default class InputModal extends Component {
  
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
    
        fetch("localhost:5000/users/register",
        {method : "POST",
        body : data
        });
    
    
      }
  
    render() {
    return (
      <div>
        <div
          className="modal fade"
          id="modalRegister"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h5 className="modal-title" id="exampleModalLabel">
                  Register
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

              <form
                  onSubmit={this.handleSubmit}
                  className="form-signin text-center"
                  >
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    // required
                    // autofocus
                  />
                  <br />

                  <label htmlFor="pass" className="sr-only">
                    password
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
                  
                  <br />
                  <button className="btn btn-lg btn-info btn-block">
                    Add Data
                  </button>
                </form>


              </div>
              <div className="modal-footer">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
