import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from '../../actions/productActions';

const ProductDetails = ({match}) => {

  
    const dispatch=useDispatch();
    const { product,error } = useSelector(
        (state) => state.productDetails
      );
    useEffect(()=>{
        dispatch(getProductDetails(match.params.id))
    },[dispatch, match.params.id])
  return (
    <>
   
    <div className='bg-orange'>
    <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

    </div>
    </>
  )
}

export default ProductDetails