import React from 'react'
import { Link } from 'react-router-dom';
    const CartItemCard = ({ item, deleteCartItems }) => {
        return (
          <div className="flex p-1 h-50 items-start box-border">
            <img src={item.image} className='h-20' alt="ssa" />
            <div className='flex flex-col  lg:m-1 m-4'>
              <Link className="lg:text-xl text-sm font-medium "to={`/product/${item.product}`}>{item.name}</Link>
              <span className='text-sm'>{`Price: ₹${item.price}`}</span>
              <p className='cursor-pointer text-sm text-orange'>Remove</p>
            </div>
          </div>
        );
      };


export default CartItemCard