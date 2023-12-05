import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../component/Loader/Loader";
import ProductCard from "../Home/ProductCard";

const Product = ({match}) => {
  const dispatch=useDispatch();
  const {products,loading,error,productsCount}=useSelector(
    (state)=>state.products
  )
  const keyword = match.params.keyword;
  useEffect(()=>{
    dispatch(getProduct(keyword))
  },[dispatch,keyword]);
  return (
   <>
   {loading?<Loader/>:
   <>
  <h2 className="mt-20 m-3 p-2 text-center lg:text-2xl text-xl">All Products</h2>
  <div className="flex flex-wrap justify-center">
    {products && products.map((product)=>(<ProductCard key={products._id}product={product}/>))}
  </div>
   </>}</>
  )
}

export default Product