import React, { Component } from "react";

import Product from "./Product";
import axios from "axios";
import InputModal from "./InputModal";
import Chart from "./Chart";
import Report from "./Report";
import { connect } from "react-redux";
import { getAll } from "../publics/actions/producs";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      checkOut: [],
      chartItem: [],
      totalPrice: 0,
      clicks: 0,
      limit: 3,
      qty: 0,
      page: 1,
      pages: 0,
      condition: ""
    };
    this.searchName = this.searchName.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  async componentDidMount() {
    await this.getAll();
    // console.log(this.props);
  }

  handleAddToCart(e, item) {
    this.setState(state => {
      const chartItem = state.chartItem;
      let productAlredyinChart = false;
      state.totalPrice = state.totalPrice + item.price;
      chartItem.forEach(data => {
        if (data.id_product === item.id_product) {
          productAlredyinChart = true;
          data.count += 1;
        }
      });

      if (!productAlredyinChart) {
        chartItem.push({ ...item, count: 1 });
      }

      localStorage.setItem("chartItem", JSON.stringify(chartItem));
      return chartItem;
    });
  }

  // getAll = async () => {
  //   await axios
  //     .get("http://localhost:5000/products?limit=" + this.state.limit)
  //     .then(result => {
  //       this.setState({
  //         data: result.data.data,
  //         pages: result.data.page
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  async getAll() {
    const fetch = await getAll(this.state.limit);
    this.props.dispatch(fetch);
    // console.log(this.props.products.productsList);
    this.setState({
      data: this.props.products.productsList,
      pages: this.props.products.pages
    });
  }

  searchName = async e => {
    let search = e.target.value;
    await axios
      .get(
        "http://localhost:5000/products?name=" +
          search +
          "&limit=" +
          this.state.limit
      )
      .then(result => {
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClickNext = async () => {
    let value = this.state.page;
    if (value >= this.state.pages) {
      value = this.state.pages;
    } else {
      this.state.clicks = this.state.clicks + 3;
      this.state.page = this.state.page + 1;
      await this.pigination();
    }
  };

  handleClickPrev = async e => {
    var value = this.state.clicks;
    if (value < 1) {
      this.state.clicks = 0;
    } else {
      this.state.clicks = this.state.clicks - 3;
      this.state.page = this.state.page - 1;
      await this.pigination();
    }
  };

  pigination = async () => {
    //console.log(this.state.clicks);
    await axios
      .get(
        "http://localhost:5000/products?page=" +
          this.state.clicks +
          "&limit=" +
          this.state.limit
      )
      .then(result => {
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  deleteCart() {
    this.setState({ chartItem: [], totalPrice: 0 });
  }
  chackOut = () => {
    this.setState({ checkOut: this.state.chartItem });
  };

  logOut() {
    localStorage.removeItem("keyToken");
    localStorage.removeItem("email");
    window.location.href = "./";
  }

  buy = async event => {
    event.preventDefault();
    const data = new FormData(event.target);
    await axios
      .post("http://localhost:5000/products/reduce", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  orderBy = async e => {
    let order = e.target.value;
    await axios
      .get(
        "http://localhost:5000/products?sortBy=" +
          order +
          "&limit=" +
          this.state.limit
      )
      .then(result => {
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let emailbuyer = localStorage.getItem("email");
    return (
      <div>
        <div className="shadow-sm p-0 m-0 bg-white rounded">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-md-1 m-0 p-0 border bg-light shadow"
                style={{ height: "700px" }}
              >
                <div>
                  <div className="text-center mt-3">
                    <button class="btn btn-link">
                      <img
                        src="http://localhost:5000/public/images/i.png"
                        style={{ width: "60px" }}
                        className="rounded"
                        alt="..."
                      />
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <button
                      class="btn btn-link"
                      type="button"
                      data-toggle="modal"
                      data-target=".bd-example-modal-xl"
                    >
                      <img
                        src="http://localhost:5000/public/images/menu.jpg"
                        style={{ width: "60px" }}
                        alt=""
                        className="rounded"
                      />
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <button
                      class="btn btn-link"
                      type="button"
                      data-toggle="modal"
                      data-target="#inputModal"
                      alt=""
                    >
                      <img
                        src="http://localhost:5000/public/images/plus.png"
                        style={{ width: "60px" }}
                        className="rounded"
                        alt=""
                      />
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <button
                      class="btn btn-link"
                      type="button"
                      onClick={event => this.logOut()}
                      alt=""
                    >
                      <img
                        src="http://localhost:5000/public/images/logout.png"
                        style={{ width: "60px" }}
                        className="rounded"
                        alt=""
                      />
                    </button>
                  </div>
                  <Report />
                  <InputModal />
                </div>
              </div>
              <div
                className="col-md-8 m-0 mt-3 p-0 "
                style={{ height: "574px", overflowX: "hidden" }}
              >
                <nav className="navbar navbar-light bg-light">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ width: "400px" }}
                    name="name"
                    onKeyPress={this.searchName}
                  />

                  <div
                    class="btn-group m-0"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleClickPrev.bind(this)}
                    >
                      <strong>Prev</strong>
                    </button>

                    <input
                      type="text"
                      class="form-control text-center"
                      placeholder="0"
                      value={this.state.page}
                      style={{ width: "50px" }}
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      //disabled
                      onClick={this.handleClickNext.bind(this)}
                    >
                      <strong>Next</strong>
                    </button>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control mt-3"
                      id="exampleFormControlSelect1"
                      style={{ width: "200px" }}
                      onChange={this.orderBy}
                    >
                      <option value="Name">Order By</option>
                      <option value="Name">Name</option>
                      <option value="Price">Price</option>
                    </select>
                  </div>
                </nav>

                <div className="row ml-5">
                  {/* {console.log(this.state.data)} */}
                  {this.state.data.map(item => {
                    return (
                      <Product
                        id_product={item.id_product}
                        name={item.name}
                        price={item.price}
                        picture={item.picture}
                        handleAddToCart={this.handleAddToCart}
                      />
                    );
                  })}
                </div>
              </div>
              <div
                className="col-md-3 m-0 p-0 bg-light shadow-lg"
                style={{ height: "700px" }}
              >
                <div
                  className="container-fluid bg-info pt-3"
                  style={{ height: "400px", overflowX: "hidden" }}
                >
                  <Chart chartItem={this.state.chartItem} />
                </div>
                <div className="text-center">
                  <h6 className="mt-2">Total : € {this.state.totalPrice}</h6>

                  <button
                    type="button"
                    class="btn btn-primary mt-4 ml-1 rounded"
                    style={{ width: "90%" }}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.chackOut()}
                  >
                    Checkout
                  </button>
                  <br />
                  <button
                    type="button"
                    class="btn btn-danger mt-2 ml-1 rounded"
                    style={{ width: "90%" }}
                    onClick={event => this.deleteCart()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <img
                  src="http://localhost:5000/public/images/shopping.jpg"
                  style={{ width: "30px" }}
                  className="rounded"
                  alt="..."
                />
                <h5 className="modal-title" id="exampleModalLabel">
                  Check Out List
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
              <div
                className="modal-body"
                style={{ height: "300px", overflowX: "hidden" }}
              >
                <table className="table table-borderless">
                  <thead>
                    <th
                      className="text-center bg-danger text-white"
                      colSpan="4"
                    >
                      Product List
                    </th>
                  </thead>
                  {this.state.checkOut.map(item => {
                    return (
                      <tr className="bg-light text-dark">
                        <td colSpan="2">{item.name}</td>
                        <td>{item.count}</td>
                        <td>€ {item.price}</td>
                      </tr>
                    );
                  })}

                  <tr border="1" className="bg-info text-white">
                    <th className="font-weight-bold" scope="row" colSpan="3">
                      Total Price
                    </th>
                    <td className="font-weight-bold bg-info text-white">
                      € {this.state.totalPrice}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="modal-footer text-center mr-3">
                <form onSubmit={this.buy}>
                  <input hidden name="email" type="text" value={emailbuyer} />
                  <input
                    hidden
                    name="total_price"
                    type="text"
                    value={this.state.totalPrice}
                  />

                  {this.state.checkOut.map(item => {
                    return (
                      <div>
                        <input
                          hidden
                          name="name"
                          type="text"
                          value={item.name}
                        />
                        <input
                          hidden
                          name="qty"
                          type="text"
                          value={item.count}
                        />
                        <input
                          hidden
                          name="price"
                          type="text"
                          value={item.price}
                        />
                      </div>
                    );
                  })}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "200px" }}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{ width: "200px" }}
                    data-dismiss="modal"
                  >
                    Cancel
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

const mapStateToProps = state => {
  //console.log(state.productList);
  return {
    products: state.productList
  };
};

// export default Content;
export default connect(mapStateToProps)(Content);
