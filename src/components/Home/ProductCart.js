import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const ProductCart = ({product}) => {
  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:product.ratings,
    isHalf:true
}
  return (
    <>
    <Link className=' lg:w-60 m-5 lg:m-10 flex flex-col pb-2 shadow-md  hover:shadow-2xl rounded-md' to={`/product/${product._id}`}>
        <img className='w-60 h-44 rounded-t-lg'src={product.images[0].url} alt={product.name} />
        <p className='text-sm m-3 font-medium'>{product.name}</p>
        <div className='m-1 flex flex-start text-sm'>
            <ReactStars {...options}/> <span className=' ' >({product.
numofReviews} reviews)</span>
        </div>
        <span className='m-2  text-text-orange'>{`₹${product.price}`}</span>
    </Link>
    </>


  )
}

export default ProductCart