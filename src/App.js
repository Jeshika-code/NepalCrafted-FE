import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import { loadUser } from "./actions/userActions.js";
import axios from "axios";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
import myOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/admin/Dashboard.js";
import ProductList from "./components/admin/ProductList.js"
import NewProduct from './components/admin/NewProduct.js'
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js"
import OrderProcess from "./components/admin/OrderProcess.js"
import UserList from "./components/admin/UserList.js"
import UpdateUser from "./components/admin/UpdateUser.js"
import productReviews from "./components/admin/productReviews.js"
import NotFound from "./components/component/NotFound.js";
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
            <Route exact path="/orders" element={<ProtectedRoute component={myOrders} />} />
            <Route exact path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />

            <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}component={Dashboard} />} />
            <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}component={ProductList} />} />
            <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true}component={NewProduct} />} />

            <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}component={UpdateProduct} />} />

            <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}component={OrderList} />} />
            <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}component={OrderProcess} />} />

            <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}component={UserList} />} />

            <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}component={UpdateUser} />} />

            <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}component={productReviews} />} />
            {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
       <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
