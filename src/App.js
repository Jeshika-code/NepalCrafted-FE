import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home.js";

import ProductDetails from "./components/Product/ProductDetails.js";
import Layout from "./components/Layout.js";
import Product from "./components/Product/Product.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import Cart from "./components/Cart/Cart.js";
import store from "./store.js";
import UserOptions from "./components/component/UserOptions.js";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js"
import { useEffect } from "react";
import { loadUser } from "./actions/userActions.js";

import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
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
            <Route path="/me/update" element={<UpdateProfile/>}/>
            <Route path="/password/update" element={<UpdatePassword/>}/>
            <Route path="/password/forgot" element={<ForgotPassword/>}/>
            <Route path="/password/reset/:token" element={<ResetPassword/>}/>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
