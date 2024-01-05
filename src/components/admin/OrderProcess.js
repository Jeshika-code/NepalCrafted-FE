import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import "./ConfirmOrder.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from './Sidebar.js';
import { getOrderDetails,clearErrors, updateOrder } from '../../actions/orderAction.js';
import { useAlert } from 'react-alert';
import Loader from '../component/Loader/Loader';
import { Button } from '@material-ui/core';
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants.js';
import "./processOrder.css"

const OrderProcess = () => {
    const [status, setStatus] = useState("");
    
  const navigate =useNavigate();
  const dispatch=useDispatch();
  const alert=useAlert();
 
  const {id}=useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };
  const proceedToPayment=()=>{}
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
      }

    dispatch(getOrderDetails(id));
  }, [ alert, error, id,isUpdated,updateError]);
  return (
    <>
    <div className="mt-10 dashboard">
        <Sidebar />
        <div className=" bg-white newProductContainer">
        {loading?(
            <Loader/>
        ):(
            <div className="confirmOrderPage"style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}>
        <div>
          <div className="lg:p-8 lg:pb-0 p-4">
            <p className='lg:text-xl text-grey font-medium lg:mt-10'>Shipping Info</p>
            <div className="orderDetailsContainerBox m-2">
                <div className="flex  text-sm m-1">
                  <p>Name:</p>
                  <span className='mx-1 my-0 '>{order.user && order.user.name}</span>
                </div>
                <div className="flex  text-sm m-1">
                  <p>Phone:</p>
                  <span className='mx-1 my-0 '>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex  text-sm m-1">
                  <p>Address:</p>
                  <span className='mx-1 my-0 '>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
            <p className="lg:text-xl  font-medium text-grey">Payment</p>
              <div className="orderDetailsContainerBox m-2">
                <div className="flex text-sm m-1">
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div className="flex text-sm m-1">
                  <p>Amount:</p>
                  <span className="mx-1 my-0">{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <p className="lg:text-xl  font-medium text-grey">Order Status</p>
              <div className="m-2 orderDetailsContainerBox">
                <div className="flex m-1 text-sm">
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

         
          <div className="lg:p-8 lg:pb-0 p-4 ">
            <p className='lg:text-xl font-medium '>Your Cart Items:</p>
            <div className="lg:m-4 confirmCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div style={{
                display: order.orderStatus === "Delivered" ? "none" : "block",
              }}>
        <form
            className="updateOrderForm"
            encType="multipart/form-data"
            onSubmit={updateOrderSubmitHandler}
          >
            <h1 className="">Order Process</h1>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
            </div>

          
            <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
          </form>
        </div>
      </div>
        )}
        </div>
      </div>
   </>
  )
}

export default OrderProcess