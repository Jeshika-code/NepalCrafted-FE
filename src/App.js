import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home.js";

import ProductDetails from "./components/Product/ProductDetails.js";
import Layout from "./components/Layout.js";
import Product from "./components/Product/Product.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import store from "./store.js";
import UserOptions from "./components/component/UserOptions.js";
import Profile from "./components/User/Profile.js";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions.js";

import { useSelector } from "react-redux";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
    <>
      <BrowserRouter>
   
        <Layout>
        {isAuthenticated && <UserOptions user={user} />}
          <Routes>
         
            <Route path="/" element={<Home />} />
            <Route exact path="/products" element={<Product/>} />
            <Route path="/products/:keyword" element={<Product/>} />
          
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Profile/>}/>
            <Route path="/login" element={<LoginSignUp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
