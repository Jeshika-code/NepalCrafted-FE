import React from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";

import { Doughnut, Line } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";
// Chart.register(CategoryScale);
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Dashboard = () => {
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["orange"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#424242", "#F9744C"],
            hoverBackgroundColor: ["#575757", "#D94E28"],
            data: [2,10],
          },
        ],
      };
  return (
    <div className="mt-10 dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <p className="text-center w-2/4 m-auto text-2xl lg:p-2">Dashboard</p>

        <div className="dashboardSummary my-4">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              {/* <p>{products && products.length}</p> */}
              <p>50</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
              <p>2</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
              {/* <p>{users && users.length}</p> */}
            </Link>
          </div>
        </div>
        <div className="lineChart w-4/5  m-auto">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
