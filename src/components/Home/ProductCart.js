// import React from 'react'
// import { Link } from 'react-router-dom'
// // import ReactStars from "react-rating-stars-component"

// const ProductCart = ({product}) => {
//   const options={
//     edit:false,
//     color:"rgba(20,20,20,0.1)",
//     activeColor:"tomato",
//     size:window.innerWidth<600?20:25,
//     value:product.ratings,
//     isHalf:true
// }
//   return (
//     <>
//     <Link className='w-60 m-10 flex flex-col pb-5 shadow-md hover:shadow-2xl  ' to={product._id}>
//         <img className='w-60'src={product.images[0].url} alt={product.name} />
//         <p className='text-xl m-3'>{product.name}</p>
//         <div className='m-1 flex flex-start'>
//             {/* <ReactStars {...options}/> <span className='m-2' >({product.numOfReviews} reviews)</span> */}
//         </div>
//         <span className='m-2 text-text-orange'>{`₹${product.price}`}</span>
//     </Link>
//     </>


//   )
// }

// export default ProductCart