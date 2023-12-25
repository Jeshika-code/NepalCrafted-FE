import React from "react";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart} from "../../actions/cartActions";
const Cart=()=>{
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

    return <>
    <div className=" mt-20 pt-8 lg:p-10 cartPage ">
        <div className=" text-sm w-full  lg:w-11/12 bg-orange text-white  box-border m-auto cartHeader">
            <p className="m-1">Product</p>
            <p className="m-1">Quantity</p>
            <p className="m-1 text-end">Subtotal</p>
        </div>
      {cartItems&&cartItems.map((item)=>(
          <div className="w-11/12  m-auto cartContainer">
          <CartItemCard item={item}/>
          <div className="flex items-center cartInput">
                  <button className="pointer bg-light-grey px-1 hover:bg-color-grey hover:text-white hover:transition duration-300 ease-in  text-center"  onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                  >
                    -
                  </button>
                  <input className="m-1 p-1 w-1/5 text-center text-sm"type="number" value={item.quantity} readOnly />
                  <button className="pointer bg-light-grey px-1 hover:bg-color-grey hover:text-white hover:transition duration-300 ease-in  text-center"  onClick={() =>
                        increaseQuantity(item.product, item.quantity,item.stock)
                      }>
                    +
                  </button>
                </div>
                <p className="flex items-center justify-end box-border cartSubtotal">{`₹${
                  item.price * item.quantity
                }`}</p>
      </div>
      ))}
      

        <div className="cartGross">
          <div></div>
          <div className="border-t-4 lg:p-1 border-orange box-border flex justify-between text-sm p-2">
            <p>Gross Total</p>
            <p>{`Rs 600`}</p>
          </div>
          <div></div>
          <div className="flex justify-end ">
            <button className="border-none w-full lg:w-6/12 cursor-pointer outline-none bg-text-orange text-white text-sm p-1 m-10  transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md">Check Out</button>
          </div>
        </div>
    </div>
    </>
}
export default Cart;