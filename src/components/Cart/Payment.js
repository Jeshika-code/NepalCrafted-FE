import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch=useDispatch();
    const alert=useAlert();
    const stripe=useStripe();
    const elements=useElements();
    const navigate=useNavigate();
    const payBtn=useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>

      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer grid place-items-center h-96 lg:mt-10 ">
        <form className="h-full lg:w-1/4 w-4/5" onSubmit={(e) => submitHandler(e)}>
          <p className="text-center w-2/4 lg:text-2xl m-auto p-2 border-b-2 border-orange">Card Info</p>
          <div className="flex items-center my-2"> 
            <CreditCardIcon className="absolute translate-x-4 text-gray-400 h-3 w-3 p-1" />
            <CardNumberElement className="box-border w-full m-2 outline-none border-solid border-2 border-slate-200 pl-10 py-1 rounded-md" />
          </div>
          <div className="flex items-center my-2">
            <EventIcon className="absolute translate-x-4 text-gray-400 h-3 w-3 p-1" />
            <CardExpiryElement className="box-border w-full m-2 outline-none border-solid border-2 border-slate-200 pl-10 py-1 rounded-md" />
          </div>
          <div className="flex items-center my-2 ">
            <VpnKeyIcon className="absolute translate-x-4 text-gray-400 h-3 w-3 p-1" />
            <CardCvcElement className="box-border w-full m-2 outline-none border-solid border-2 border-slate-200 pl-10 py-1 rounded-md" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="border-none w-full cursor-pointer outline-none bg-orange text-white text-sm p-2 transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md"
          />
        </form>
      </div>
    </>
  )
}

export default Payment