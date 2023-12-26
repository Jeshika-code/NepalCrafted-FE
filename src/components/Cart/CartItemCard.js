import React from 'react'
import { Link } from 'react-router-dom';
    const CartItemCard = ({ item, deleteCartItems }) => {
        return (
          <div className="flex p-1 h-50 items-start box-border CartItemCard">
            <img src={item.image} className='h-20 w-20 lg:m-1' alt="ssa" />
            <div className='flex flex-col  lg:m-1 m-4'>
              <Link className="lg:text-xl text-sm font-medium "to={`/product/${item.product}`}>{item.name}</Link>
              <span className='text-sm'>{`Price: ₹${item.price}`}</span>
              <p className='cursor-pointer text-sm text-orange'  onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
          </div>
        );
      };


export default CartItemCard