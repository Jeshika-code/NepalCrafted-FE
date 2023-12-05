import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home.js";

import ProductDetails from "./components/Product/ProductDetails.js";
import Layout from "./components/Layout.js";
import Product from "./components/Product/Product.js";
import Search from "./components/Product/Search.js";
function App() {
  return (
    <>
      <BrowserRouter>
   
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product/>} />
            {/* <Route path="/product/:keyword" element={<Product/>} /> */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<Search />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
