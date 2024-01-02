import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css"
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../component/Loader/Loader";

const OrderDetails = (match) => {
    const { id } = useParams();
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getOrderDetails(id));
    }, [dispatch, alert, error,id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
         
          <div className="orderDetailsPage mt-20">
            <div className="lg:p-4 p-2  pb-0">
              <p className="lg:text-2xl m-4 ml-0 text-orange  ">
                Order #{order && order._id}
              </p>
              <p className="lg:text-2xl  font-medium text-grey">Shipping Info</p>
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
              <p className="lg:text-2xl  font-medium text-grey">Payment</p>
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

              <p className="lg:text-2xl  font-medium text-grey">Order Status</p>
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

            <div className="orderDetailsCartItems lg:p-4 lg:pb-0 p-4">
              <p className="lg:text-xl ">Your Ordered Items:</p>
              <div className="orderDetailsCartItemsContainer">
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
        </>
      )}
    </>
  )
}

export default OrderDetails