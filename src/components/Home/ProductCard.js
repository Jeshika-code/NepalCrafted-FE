import React from 'react'
import { Link } from 'react-router-dom'

import { Rating } from '@material-ui/lab'

const ProductCard = ({product}) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size:"small"
  };
  return (
    <>
    <Link className=' lg:w-60 m-5 lg:m-10 flex flex-col pb-2 shadow-md  hover:shadow-2xl rounded-md' to={`/product/${product._id}`}> 
        <img className='w-60 h-44 rounded-t-lg'src={product.images[0].url} alt={product.name} />
        <p className='text-sm m-3 font-medium'>{product.name}</p>
        <div className='m-1 flex flex-start text-sm'>
            <Rating {...options}/> <span className=' ' >({product.
numofReviews} reviews)</span>
        </div>
        <span className='m-2  text-text-orange'>{`₹${product.price}`}</span>
    </Link>
    </>


  )
}

export default ProductCard