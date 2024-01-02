import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="m-auto text-center items-center flex flex-col justify-center mt-20 h-96">
      <CheckCircleIcon className="text-orange"/>

      <p className="text-xl m-2 font-medium">Your Order has been Placed successfully </p>
      <Link to="/order/me" className="border-nonecursor-pointer outline-none bg-orange text-white text-sm p-2 m-2 transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;