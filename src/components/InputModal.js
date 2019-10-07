import React, { Component } from "react";
import axios from "axios";
export default class InputModal extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    //console.log("componentDidMount", this.state.data);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:5000/products/add", {
      method: "POST",
      body: data
    });
  }

  getCategory = async () => {
    await axios
      .get("http://localhost:5000/categories")
      .then(result => {
        this.setState({
          categories: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="inputModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <div
                  className="text-center mr-2 "
                  style={{ marginLeft: "160px" }}
                >
                  <img
                    src="http://localhost:5000/public/images/plus.png"
                    style={{ width: "30px" }}
                    className="rounded"
                    alt="..."
                  />
                </div>

                <h5 className="modal-title" id="exampleModalLabel">
                  Add Data
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
                  <label htmlFor="name" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Name Product"
                    // required
                    // autofocus
                  />
                  <br />

                  <label htmlFor="description" className="sr-only">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    // required
                  />
                  <br />

                  <div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="pict"
                        name="pict"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <br />
                  <div class="form-group">
                    <select class="form-control" id="exampleFormControlSelect1">
                      {this.state.categories.map((item, index) => {
                        return <option value={item.name}>{item.name}</option>;
                      })}
                    </select>
                  </div>
                  <br />
                  <label htmlFor="price" className="sr-only">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    // required
                    // autofocus
                  />
                  <br />
                  <label htmlFor="qty" className="sr-only">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="qty"
                    name="qty"
                    className="form-control"
                    placeholder="Quantity"
                    // required
                    // autofocus
                  />
                  <br />
                  <button className="btn btn-lg btn-info btn-block">
                    Add Data
                  </button>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
