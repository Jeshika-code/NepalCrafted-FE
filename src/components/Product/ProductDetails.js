import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from '../../actions/productActions';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ match }) => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { product, error } = useSelector(
        (state) => state.productDetails
    );
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])
    return (
        <>

            <div className='bg-orange'>
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={item.url}
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