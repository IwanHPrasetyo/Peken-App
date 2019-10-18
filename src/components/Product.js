import React, { Component } from "react";
import UpdateModal from "./UpdateModal";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      name: "",
      price: 0,
      image: "",
      description: "",
      qty: 0
    };
  }

  deleteProduct = async data => {
    console.log(data);
    //data.preventDefault();
    axios
      .delete("http://3.80.248.213:5000/products/delete/?id_product=" + data)
      .then(res => console.log(res.data));
  };

  render() {
    return (
      <div>
        <div className="shadow p-3 mt-3 ml-2 bg-white text-center rounded">
          <div className="card" style={{ width: "14rem" }}>
            <div className="row">
              <button
                class="btn btn-link"
                type="button"
                style={{ marginRight: "250px", marginTop: "-10px" }}
              >
                <div className="text-center mt-4">
                  <img
                    src={"http://3.80.248.213:5000/public/images/delete.png"}
                    style={{ width: "30px", marginTop: "-25px" }}
                    className="rounded"
                    alt="..."
                    onClick={e => this.deleteProduct(this.props.id_product)}
                  />
                </div>
              </button>

              <button
                class="btn btn-link "
                type="button"
                style={{ marginRight: "201px", marginTop: "-20px" }}
                data-toggle="modal"
                data-target="#updateModal"
                // onClick={(e) => this.props.AddUpdate(e, this.props)}
              >
                <div
                  className="text-center "
                  style={{ marginLeft: "190px", marginTop: "-35px" }}
                >
                  <img
                    src={"http://3.80.248.213:5000/public/images/edit.png"}
                    style={{ width: "30px" }}
                    className="rounded"
                    alt="..."
                    // onClick={(e) => this.getUpdate(this.props)}
                  />
                </div>
              </button>
              <UpdateModal />
            </div>

            <img
              src={
                "http://3.80.248.213:5000/public/images/" + this.props.picture
              }
              className="card-img-top p-3 img-fluid"
              style={{ height: "182px" }}
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">€ {this.props.price}</p>
              <button
                className="btn btn-primary rounded"
                onClick={e => this.props.handleAddToCart(e, this.props)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
