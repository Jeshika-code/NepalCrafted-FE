import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useAlert } from "react-alert";
import Loader from "../component/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@material-ui/core/Typography";
const categories = [
  "Hemp Products",
  "Beads Mala",
  "Home Decor Craft",
  "Pottery Products",
  "Incense Product",
];
function valuetext(price) {
  return `${price}`;
}
const Product = ({ match }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const alert=useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  
  const { products, loading, error, productsCount, resultPerPage,filteredProductsCount, } =
    useSelector((state) => state.products);
  // const keyword=match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(id, currentPage, price,category));
  }, [dispatch, id, currentPage, price,category,alert,error]);
let count = filteredProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mt-20 m-3 p-2 text-center lg:text-3xl text-xl">
            All <span className="text-text-orange underline decoration-wavy decoration-gray-300		">Products</span>
          </h2>
          <div className="flex flex-wrap justify-center lg:ml-16">
            {products &&
              products.map((product) => (
                <ProductCard key={products._id} product={product} />
              ))}
          </div>
          {/* <div className="lg:w-40 lg:absolute top-1/4  ml-1 p-1 static w-60 text-center"> <Typography >Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={25000}/></div> */}

          <Box className=" lg:w-40 p-2 lg:absolute top-1/4  lg:ml-1 ml-2 text-sm static w-60">
            Price Ranges :
            <Slider 
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={4000}
              getAriaValueText={valuetext}
            />
            Categories
            <ul className="">
              {categories.map((category) => (
                <li
                  className="cursor-pointer bg-light-grey m-1 p-1 hover:text-text-orange"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            
          </Box>

          {resultPerPage < count && (
            <div className="flex justify-center m-4 ">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Product;
