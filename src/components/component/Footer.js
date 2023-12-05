import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import playStore from "../../../src/images/Playstore.png"
import faceBook from "../../../src/images/icons8-facebook-48.png"
import instaGram from "../../../src/images/icons8-instagram-48.png"
import twitter from "../../../src/images/icons8-twitter-48.png";

import Dropdown from "../../components/Dropdown"

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white py-18 px-10 pb-10">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 mt-2 md:mb-0">
        <h2 className="md:text-2xl text-xl font-medium mb-4 text-text-orange">NepalCrafted</h2>
          
          <p className=" text-sm mb-2  hover:text-text-orange">Butwal 32900</p>
          <p className="text-sm hover:text-text-orange">Butwal 32900</p>
         

             </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 mt-2  md:mb-0">
          <h2 className="lg:text-xl text-text-orange text-sm font-medium mb-2 ">Quick Links</h2>
          <ul>
            <li className="mb-1"><a href="#" className="text-sm hover:text-text-orange">Home</a></li>
            <li className="mb-1"><a href="#" className="text-sm hover:text-text-orange">About</a></li>
            <li className="mb-1"><a href="#" className="text-sm hover:text-text-orange">Local Artisans </a></li>
            <li className="mb-1"><a href="#" className="text-sm hover:text-text-orange">Contact </a></li>
            {/* <li className="mb-2"><a href="#" className="hover:text-text-orange  ">Select : <Dropdown/> </a></li> */}
            
          </ul>
          
        </div>
        
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 mt-2  md:mb-0">
            
        <h2 className="lg:text-xl text-sm text-text-orange font-medium mb-2">Follow Us</h2>
          <div className="flex items-center space-x-4">
          <img className="h-7" src={faceBook} />
          <img className="h-7" src={instaGram} />
          <img className="h-7" src={twitter} />
          
          </div>
          
       
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h2 className="lg:text-xl text-sm text-text-orange font-medium mb-4 mt-2  ">Newsletter</h2>
          <p className="text-sm mb-4">Subscribe to our newsletter for updates.</p>
          <div className="flex items-center">
            <input type="email" placeholder="Your email" className="w-full px-2 py-1 rounded-l-md text-black focus:outline-none" />
            <button className="bg-button-orange text-white px-2 py-1  rounded-r-md hover:bg-orange-700 focus:outline-none">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
