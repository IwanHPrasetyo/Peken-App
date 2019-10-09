import React, { Component } from "react";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: [],
      qty: 0,
      totalPrice: 0
    };
  }

  render() {
    const { chartItem } = this.props;
    //var chart = this.state.chart;
    //chart.push(chartItem);
    //var price = 0;
    return (
      <div>
        {chartItem.map(item => (
          <div className="media bg-white m-2 shadow rounded">
            <img
              src={"http://localhost:5000/public/images/" + item.picture}
              class="ml-2 mr-2 mt-3 shadow-sm rounded"
              alt="..."
              style={{ width: "120px" }}
            />
            <div className="media-body mt-2 ml-1">
              <h6 className="mt-0">{item.name}</h6>
              <p className="mt-0">
                <strong>€ {item.price * item.count}</strong>
              </p>

              <div
                class="btn-group m-2"
                role="group"
                aria-label="Basic example"
              >
                <button
                  onClick={item.count - 1}
                  type="button"
                  className="btn btn-primary"
                >
                  <strong>-</strong>
                </button>
                <input
                  type="text"
                  class="form-control text-center"
                  value={item.count}
                  placeholder="0"
                  style={{ width: "50px" }}
                />
                <button
                  //onClick={console.log(item.count + 1)}
                  type="button"
                  className="btn btn-primary"
                >
                  <strong>+</strong>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Chart;
