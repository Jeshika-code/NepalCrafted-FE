
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dropdown from './components/Dropdown.js';

import Header from "./components/component/Header.js"

import Footer from "./components/component/Footer.js"
import  Home from "./components/Home/Home.js"
import HomeProduct from './components/Home/HomeProduct.js';
import ProductDetails from "./components/Product/ProductDetails.js"
function App() {
 
  return (
    
    <Router>
   <Header/> 
   <Home/>
   <HomeProduct/>
   <Routes>
    

   <Route exact path="/product/:id" component={ProductDetails}/>
  
   
   </Routes>
  
   

   {/* <Router>
   <Routes>
 
  </Routes>   */}
   <Footer/>
   </Router>
   
   

  );
}

export default App;
