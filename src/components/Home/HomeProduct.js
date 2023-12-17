import React, { useEffect } from "react";
import Product from "../Home/ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../component/Loader/Loader.js";
const HomeProduct = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
<>{loading?(<Loader/>):(
      <>
      <div>
        <h1 className="text-xl  text-center  lg:text-3xl mt-5">
          Most Popular <span className="text-text-orange"> Product</span>{" "}
        </h1>
      </div>
      <div className=" flex flex-wrap m-5 lg:m-10 lg:ml-16 justify-center">
        {products && products.map((product) => <Product product={product} />)}
      </div>
    </>
)}</>
  );
};

export default HomeProduct;
