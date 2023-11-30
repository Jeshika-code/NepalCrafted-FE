
import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Dropdown from './components/Dropdown.js';

import Header from "./components/component/Header.js"

import Footer from "./components/component/Footer.js"
import  Home from "./components/Home/Home.js"
import HomeProduct from './components/Home/HomeProduct.js';
import ProductDetails from "./components/Product/ProductDetails.js"
function App() {
 
  return (
    
    <BrowserRouter>
   <Header/> 
   <Home/>
   <HomeProduct/>
   <Routes>
    

   <Route exact path="/product/:id" element={<ProductDetails/>}/>
  
   
   </Routes>
  
   

   {/* <Router>
   <Routes>
 
  </Routes>   */}
   <Footer/>
   </BrowserRouter>
   
   

  );
}

export default App;
