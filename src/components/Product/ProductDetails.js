import React, { useEffect,useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import ReviewCard from "./ReviewCard.js";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";
import Loader from "../component/Loader/Loader.js";
import { addItemsToCart } from "../../actions/cartActions.js";
const ProductDetails = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert=useAlert();
  const { product, loading,error } = useSelector((state) => state.productDetails);
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert]);

  const options = {
    size: window.innerWidth<600?20:25,
    value: product.ratings,
    isHalf:true,
    precision: 0.5,
    edit:false
  };
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
 

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  return (
  <>
  {loading?(
  <Loader/>
  ):
  (  
  <>
  
    <div className="  lg:flex p-5 mt-16 box-border lg:mt-21    ">
      <div className=" lg:shadow-md w-full flex lg:flex-col justify-evenly	items-center">
        <Carousel className="h-50 w-60 mt-5 ">
          {product.images &&
            product.images.map((item, i) => (
              <img className="rounded-md h-30 " key={i} src={item.url} alt={`${i} Slide`} />
            ))}
        </Carousel>
      </div>
      <div className="shadow-md w-full flex flex-col justify-evenly	lg:items-start p-4 ">
        <div>
          <h2 className="lg:text-2xl text-sm text-center font-medium  text-text-orange">
            {product.name}
          </h2>
          
          <p className="text-sm lg:m-1">Product #{product._id}</p>
        </div>
        <div>
           <p className="text-sm m-1 font-normal">{product.description}</p>
        </div>
        <div className="flex items-start items-center justify-center		border-t-2 border-orange-300 border-b-2 border-orange-300 m-1">
          <ReactStars {...options} />
          <span className="text-sm">({product.numofReviews } Reviews)</span>
        </div>
        <div className="w-4/5">
          <h1 className="p-1 text-sm">{`Cost: ₹${product.price}`}</h1>
          <div className="flex items-center">
            < div className="">
              <button className="pointer bg-light-grey px-2 hover:bg-color-grey hover:text-white hover:transition duration-300 ease-in  text-center" onClick={decreaseQuantity}>-</button>
              <input readOnly className="m-2 py-1 w-1/5 text-center text-sm"value={quantity} type="number"  />
              <button className="pointer bg-light-grey px-2 hover:bg-color-grey hover:text-white hover:transition duration-300 ease-in text-center " onClick={increaseQuantity}>+</button>
              
              <button  disabled={product.Stock < 1 ? true : false}className="rounded p-1 m-1 text-sm bg-orange hover:bg-button-orange  text-white" onClick={addToCartHandler}>
              Add to Cart
            </button>
            </div>
          </div>
          <p className="text-sm">
            Status:
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>
      
        <button className="bg-orange-400 m-1 text-white lg:p-1  rounded-md text-sm">
          Submit Review
        </button>
      </div>
    </div>
    <h3 className="text-center lg:text-2xl mt-5 mb-5 ">Our Customer Reviews</h3>
    
    {product.reviews && product.reviews[0] ? (
          <div className=" flex overflow-auto">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard  review={review} />
              ))}
          </div>
        ) : (
          <p className="text-center italic lg:text-xl m-2">No Reviews Yet</p>
        )}

    
  </>)}</>
  );
};

export default ProductDetails;
