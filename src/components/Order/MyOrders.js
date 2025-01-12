import React, {  useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from "@material-ui/icons/Launch";
import Loader from "../component/Loader/Loader";



const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
  
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
const columns=[
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
    //   type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
    
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
    
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon className="transition-all duration-500 ease-in hover:text-button-orange "/>
          </Link>
        );
      },
    },
  
  ];
  const rows = [
  ];
  orders &&
  orders.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        dispatch(myOrders());
      }, [dispatch, alert, error]);
    
  return (
    <>
   
    {loading ? (
      <Loader/>
    ) : (
      <div className="w-screen  lg:px-4 p-1  flex flex-col h-96 mb-20 max-w-full  box-border  mt-20 ">
         <p className="text-center text-light-black bg-light-grey lg:text-xl box-border ">{user.name}'s Orders</p>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
        />

       
      </div>
    )}
  </>
  )
}

export default MyOrders