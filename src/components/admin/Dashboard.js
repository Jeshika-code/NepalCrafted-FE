import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";

import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { getAdminProduct } from "../../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader/Loader.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
Chart.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products,loading } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

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
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };
  return (
 <>
 {loading?(
  <Loader/>
 ):(
  <>
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
            <p>{products && products.length}</p>
          
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            
            <p>{users && users.length}</p>
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
  </>
 )}
 </>
  );
  
};

export default Dashboard;
