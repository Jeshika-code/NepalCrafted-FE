import React from 'react'
import { useSelector } from 'react-redux'
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckoutSteps from "../Cart/CheckoutSteps.js"


const ConfirmOrder = () => {
  const navigate =useNavigate();
    const{shippingInfo,cartItems}=useSelector((state)=>state.cart);
    const{user}=useSelector((state)=>state.user);
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.18;
    
      const totalPrice = subtotal + tax + shippingCharges;
    
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate("/process/payment");
      };
    
  return (
    <>
    
    <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="lg:p-8 lg:pb-0 p-4">
            <p className='lg:text-2xl font-medium'>Shipping Info</p>
            <div className="lg:m-4 pr-8 shippingIn">
              <div className='flex m-1 text-sm '>
                <p>Name:</p>
                <span className=' mx-1 my-0'>{user.name}</span>
              </div>
              <div className='flex m-1 text-sm'>
                <p>Phone:</p>
                <span className='mx-1 my-0 '>{shippingInfo.phoneNo}</span>
              </div>
              <div className='flex m-1 text-sm'>
                <p>Address:</p>
                <span className='mx-1 my-0'>{address}</span>
              </div>
            </div>
          </div>
          <div className="lg:p-8 lg:pb-0 p-4 ">
            <p className='lg:text-xl font-medium'>Your Cart Items:</p>
            <div className="lg:m-4 confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
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
        <div>
          <div className="lg:p-8 lg:pb-0 orderSummary">
            <p className='text-center box-border w-36  m-auto border-b-2  font-medium text-sm p-2 border-orange '>Order Summary</p>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button  className="border-none w-full cursor-pointer outline-none bg-orange text-white text-sm p-2 transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md"onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
  </>
  )
}

export default ConfirmOrder