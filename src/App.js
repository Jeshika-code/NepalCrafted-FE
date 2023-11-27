
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

function App() {
 
  return (
    <>
    
   <Header/> 
   <Home/>
   <HomeProduct/>
   {/* <Router>
   <Routes>
  <Route exact path="/" component={Home}/>
  </Routes>   */}
   <Footer/>
   
   {/* </Router> */}
</>
  );
}

export default App;
