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
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js"
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userActions.js";
import axios from "axios";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);
  return (
    <>
      <BrowserRouter>
   
        <Layout>
        {isAuthenticated && <UserOptions user={user} />}
      
 
        {stripeApiKey && (
         <Elements stripe={loadStripe(stripeApiKey)}>
         <Routes>
         <Route exact path="/process/payment" element={<ProtectedRoute component={Payment} />} />
            
          </Routes>
     </Elements>
      )}
     
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/products" element={<Product/>} />
            <Route path="/products/:keyword" element={<Product/>} />
          
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<ProtectedRoute component={Profile} />}/>
            <Route path="/me/update" element={<ProtectedRoute component={UpdateProfile} />}/>
            <Route path="/password/update" element={<ProtectedRoute component={UpdatePassword} />}/>
            <Route path="/password/forgot" element={<ForgotPassword/>}/>
            <Route path="/password/reset/:token" element={<ResetPassword/>}/>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={<ProtectedRoute component={Shipping} />} />
           
        
            <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
            <Route exact path="/success" element={<ProtectedRoute component={OrderSuccess} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
