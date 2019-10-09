import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      total_year: [],
      total_week: []
    };
  }
  async componentDidMount() {
    await this.getRevenue();
    console.log("componentDidMount", this.state.revenue);
  }

  getRevenue = async () => {
    await axios
      .get("http://localhost:5000/revenues")
      .then(result => {
        this.setState({
          revenue: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const data = {
      labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007"],
      datasets: [
        {
          label: "This Monthly",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 65, 59, 80, 65, 59]
        },
        {
          label: "Last Monthly",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(127, 63, 191,1)",
          borderColor: "rgba(127, 63, 191,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [80, 100, 80, 40, 59, 90, 65, 80]
        }
      ]
    };

    return (
      <div>
        <div
          className="modal fade bd-example-modal-xl container-fluid"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myExtraLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="row ml-0">
                <nav
                  className="navbar navbar-light bg-info text-center rounded shadow"
                  style={{ width: "98.7%" }}
                >
                  <span
                    className="navbar-brand mb-0 h1 text-light"
                    style={{ marginLeft: "500px" }}
                  >
                    HISTORY
                  </span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">X</span>
                  </button>
                </nav>
              </div>
              <div className="row mt-5 mb-4 " style={{ marginLeft: "80px" }}>
                <div class="col-4" style={{ marginLeft: "20px" }}>
                  <div
                    className="card bg-info text-white shadow"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <p class="card-text">Today's Income</p>
                      <h5 className="card-title">€ 100</h5>
                      <p class="card-text">+20% Yesterday</p>
                    </div>
                  </div>
                </div>

                <div class="col-4" style={{ marginLeft: "-50px" }}>
                  <div
                    className="card bg-warning text-white shadow"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <p class="card-text">Order</p>
                      <h5 className="card-title">3270</h5>
                      <p class="card-text">+5% Last Week</p>
                    </div>
                  </div>
                </div>

                <div class="col-4" style={{ marginLeft: "-50px" }}>
                  <div
                    className="card bg-primary text-white shadow"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <p class="card-text">This Year Income</p>
                      <h5 className="card-title">€ 10000</h5>
                      <p class="card-text">+10% Last Year</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-11 ml-5 mt-4 bg-light shadow">
                  <h2>Revenue</h2>
                  <Line data={data} />
                </div>
              </div>
              <div className="row">
                <div className="col-11 ml-5 mt-5 mb-5 bg-light shadow rounded">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="col-md-12 mb-3">
                            <h4>Recent Order</h4>
                          </div>
                        </th>
                        <th colSpan="5">
                          <div className="form-group">
                            <div
                              className="col-md-12"
                              style={{ marginLeft: "500px" }}
                            >
                              <select
                                className="form-control mt-0"
                                id="exampleFormControlSelect1"
                                style={{ width: "200px" }}
                                onChange={this.orderBy}
                              >
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Mounth">Mounth</option>
                              </select>
                            </div>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">Invoices</th>
                        <th scope="col">User</th>
                        <th scope="col">Date</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.revenue.map((item, index) => {
                        return (
                          <tr>
                            <th scope="row"># {item.invoices}</th>
                            <td>{item.user}</td>
                            <td>{item.date}</td>
                            <td>{item.order}</td>
                            <td>{item.amount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Report;
