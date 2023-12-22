import React from "react";
import CartItemCard from "./CartItemCard.js";

const Cart=()=>{
    const item={
        product:"productID",
        price:200,
        name:"ProductOne",
        quantity:1,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmucejLtuvUUS6N6aDHkagNnI3zKirp_YsJQKRvKFGLA&s"
    }
    return <>
    <div className=" mt-20 pt-8 lg:p-10 cartPage ">
        <div className=" text-sm w-full  lg:w-11/12 bg-orange text-white  box-border m-auto cartHeader">
            <p className="m-1">Product</p>
            <p className="m-1">Quantity</p>
            <p className="m-1 text-end">Subtotal</p>
        </div>
        <div className="w-11/12  m-auto cartContainer">
            <CartItemCard item={item}/>
            <div className="flex items-center">
                    <button className="pointer bg-light-grey px-2 hover:bg-color-grey hover:text-white hover:transition duration-300 ease-in  text-center"
                    >
                      -
                    </button>
                    <input className="m-2 py-1 w-1/5 text-center text-sm"type="number" value={item.quantity} readOnly />
                    <button className="pointer bg-light-grey px-2 hover:bg-color-grey hover:text-white hover:transition duration-300 ease-in  text-center">
                      +
                    </button>
                  </div>
                  <p className="flex items-center justify-end box-border">{`₹${
                    item.price * item.quantity
                  }`}</p>
        </div>
    </div>
    </>
}
export default Cart;