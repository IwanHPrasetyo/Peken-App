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
      daylast: 0,
      daynow: 0,
      weeklast: 0,
      weeknow: 0,
      yearlast: 0,
      yearnow: 0,
      total_income: [],
      orderby: "day",
      tittle: "dayname",
      total_year: [],
      total_week: []
    };
  }
  async componentDidMount() {
    await this.getRevenue();
    await this.getIncome();
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

  getIncome = async () => {
    await axios
      .get("http://localhost:5000/revenues/income")
      .then(result => {
        this.setState({
          total_income: result.data.data[0],
          daylast: result.data.data[0].daylast,
          daynow: result.data.data[0].daynow,
          weeklast: result.data.data[0].lastweek,
          weeknow: result.data.data[0].weeknow,
          yearlast: result.data.data[0].yearlast,
          yearnow: result.data.data[0].yearnow
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.total_income);
  };

  getRevenueby = async event => {
    let by = event.target.value;
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
    let growday =
      (
        ((this.state.daynow - this.state.daylast) / this.state.daylast) *
        100
      ).toFixed(0) + "%";

    let groworder =
      (
        ((this.state.weeknow - this.state.weeklast) / this.state.weeklast) *
        100
      ).toFixed(0) + "%";

    let growyear =
      (
        ((this.state.yearnow - this.state.yearlast) / this.state.yearlast) *
        100
      ).toFixed(0) + "%";

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

    this.state.chart.forEach(item => {
      incomes.push(item.income);
      day.push(item.dayname);
      month.push(item.monthname);
      year.push(item.year);
    });

    if (this.state.tittle === "day") {
      label.push(day);
    } else if (this.state.tittle === "week") {
      label.push(weektitle);
    } else if (this.state.tittle === "month") {
      label.push(month);
    } else if (this.state.tittle === "year") {
      label.push(year);
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
                      <h5 className="card-title">
                        € {this.state.total_income.daynow}
                      </h5>
                      <p class="card-text">+{growday}</p>
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
                      <h5 className="card-title">
                        {this.state.total_income.weeknow}
                      </h5>
                      <p class="card-text">+{groworder}</p>
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
                      <h5 className="card-title">
                        € {this.state.total_income.yearnow}
                      </h5>
                      <p class="card-text">+{growyear}</p>
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
                            <td>{item.date.substr(0, 10)}</td>
                            <td>{item.dataorder}</td>
                            <td>€ {item.amount}</td>
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
