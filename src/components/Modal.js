import React, { Component } from "react";

export default class Modal extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://localhost:5000/products/add",
    {method : "POST",
    body : data
    });


  }


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
                    marginLeft: "500px"
                  }}
                >
                  <h1 className="h3 mb-3 font-weight-bold">Add Data</h1>
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
                      <input type="file" className="custom-file-input" id="pict" name="pict" aria-describedby="inputGroupFileAddon01" />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                    </div>
                  </div>


                  <br />
                  <label htmlFor="category" className="sr-only">
                    Category
                  </label>
                  <input
                    type="text"
                    id="id_category"
                    name="id_category"
                    className="form-control"
                    placeholder="Category"
                  />
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
                  <button className="btn btn-lg btn-info btn-block" id="btnSeccion">
                    Add Data
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
