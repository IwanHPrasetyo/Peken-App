import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      chart: [],
      table: [],
      total_income: 0,
      orderby: "day",
      tittle: "dayname",
      total_year: [],
      total_week: []
    };
  }
  async componentDidMount() {
    await this.getRevenue();
  }

  getRevenue = async () => {
    await axios
      .get("http://localhost:5000/revenues")
      .then(result => {
        this.setState({
          revenue: result.data.data,
          table: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getRevenueby = async event => {
    let by = event.target.value;
    //console.log(by);

    this.setState({
      orderby: by
    });

    axios
      .get("http://localhost:5000/revenues/order?by=" + by)
      .then(result => {
        console.log(result);
        this.setState({
          table: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  orderchartBy = async event => {
    let orderby = event.target.value;

    this.setState({
      tittle: orderby
    });

    axios
      .get("http://localhost:5000/revenues/by?orderby= " + orderby)
      .then(result => {
        this.setState({
          chart: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let incomes = [];
    let day = [];
    let monthtitle = ["week 1", "week 2", "week 3", "week 4"];
    let weektitle = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let month = [];
    let yeartitle = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "March",
      "September",
      "October",
      "November",
      "December"
    ];
    let year = [];
    let total = [];
    let label = [];
    let total_bayar = 0;

    this.state.chart.forEach(item => {
      incomes.push(item.income);
      day.push(item.dayname);
      month.push(item.monthname);
      year.push(item.year);
    });

    this.state.revenue.forEach(item => {
      total.push(item.amount);
      total_bayar += item.amount;
    });

    if (this.state.tittle === "day") {
      label.push(day);
    } else if (this.state.tittle === "week") {
      label.push(weektitle);
    } else if (this.state.tittle === "month") {
      label.push(monthtitle);
    } else if (this.state.tittle === "year") {
      label.push(yeartitle);
    }

    const data = {
      labels: label[0],
      datasets: [
        {
          label: "This " + this.state.tittle,
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
          data: incomes
        }
        // ,
        // {
        //   label: "Last " + this.state.tittle,
        //   fill: false,
        //   lineTension: 0.1,
        //   backgroundColor: "rgba(127, 63, 191,1)",
        //   borderColor: "rgba(127, 63, 191,1)",
        //   borderCapStyle: "butt",
        //   borderDash: [],
        //   borderDashOffset: 0.0,
        //   borderJoinStyle: "miter",
        //   pointBorderColor: "rgba(75,192,192,1)",
        //   pointBackgroundColor: "#fff",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //   pointHoverBorderColor: "rgba(220,220,220,1)",
        //   pointHoverBorderWidth: 2,
        //   pointRadius: 1,
        //   pointHitRadius: 10,
        //   data: [10, 60, 20]
        // }
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
                    <img
                      src="http://localhost:5000/public/images/close2.png"
                      style={{ width: "60px" }}
                      className="rounded"
                      alt=""
                    />
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
                      <h5 className="card-title">€ {total_bayar}</h5>
                      <p class="card-text">+10% Last Year</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-11 ml-5 mt-4 bg-light shadow">
                  <div className="row mt-4">
                    <div className="col-6">
                      <h2 className="ml-2">Revenue</h2>
                    </div>
                    <div className="col-6">
                      <form>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          style={{ width: "200px", marginLeft: "60%" }}
                          onChange={this.orderchartBy}
                        >
                          <option value="day">Daily</option>
                          <option value="week">Weekly</option>
                          <option value="month">Mounth</option>
                          <option value="year">Year</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <Line data={data} />
                </div>
              </div>
              <div className="row">
                <div className="col-11 ml-5 mt-5 mb-5 bg-light shadow rounded ">
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
                              <form>
                                <select
                                  className="form-control mt-0"
                                  id="exampleFormControlSelect1"
                                  style={{ width: "200px" }}
                                  onChange={this.getRevenueby}
                                >
                                  <option value="day">Daily</option>
                                  {/* <option value="week">Weekly</option> */}
                                  <option value="month">Month</option>
                                  <option value="year">Year</option>
                                </select>
                              </form>
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
                      {this.state.table.map((item, index) => {
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
