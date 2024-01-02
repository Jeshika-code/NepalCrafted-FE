import React, { useEffect,useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productActions";
import ReviewCard from "./ReviewCard.js";
import { useParams } from "react-router-dom";

import { useAlert } from "react-alert";
import Loader from "../component/Loader/Loader.js";
import { addItemsToCart } from "../../actions/cartActions.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";
const ProductDetails = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert=useAlert();
  const { product, loading,error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET});
    }
  
 
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert,reviewError,success]);

  const options = {
   
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId",id);

    dispatch(newReview(myForm));

    setOpen(false);
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
          <Rating {...options} />
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
      
        <button onClick={submitReviewToggle}className="bg-orange m-1 text-white lg:p-1  rounded-md text-sm">
          Submit Review
        </button>
      </div>
    </div>
    <h3 className="text-center lg:text-2xl mt-5 mb-5 ">Our Customer Reviews</h3>
    <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog flex flex-col">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea border border-light-grey outline-none "
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
</Dialog>
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
