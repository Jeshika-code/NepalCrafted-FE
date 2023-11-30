import React,{useEffect} from 'react'
import Product from "../Home/ProductCard.js"
import { getProduct } from "../../actions/productActions";
import {useSelector,useDispatch} from "react-redux"
import { useAlert } from "react-alert";

const HomeProduct = () => {
  const alert=useAlert()
  const dispatch = useDispatch();
  const { loading, error, products,productsCount } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
       return alert.error(error);
      
    }
 
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  return (
    <>
    <div >
    <h1 className='text-2xl  text-center  lg:text-3xl mt-5'>Most Popular <span className='text-text-orange'> Product</span> </h1>
    </div>
    <div className=' flex flex-wrap m-5 lg:m-10 justify-center' >
    {products &&
              products.map((product) => (
                <Product  product={product} />
              ))}
    </div>
    </>
  )
}

export default HomeProduct