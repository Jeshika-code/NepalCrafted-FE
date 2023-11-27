// src/components/Dropdown.js
import React, { useState,forwardRef } from 'react';
import withClickOutside from './Clickoutside';
const Dropdown =forwardRef( ({isOpen,setisOpen},ref) => {
  

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };


  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center  w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
      > */}
      { <button type="button"
        onClick={toggleDropdown} onBlur={()=>console.log("outside")}className='btn bg-button-orange text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 hover:text-text-orange  }
                hover:bg-button-white'>
                
        Product Categories
      </button>
}
      {isOpen && (
        <div className="origin-top-right absolute left-2 mt-2 w-56 rounded-md shadow-lg bg-white  opacity-4 sm:w-48 md:w-64 ">
        
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-700"
              role="menuitem"
            >
              Nepal Paschmina
            </a>
            <a
              href="#"
              className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Wooden Statues
            </a>
            <a
              href="#"
              className="block font-semibold font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Beads Mala 
            </a>
            <a
              href="#"
              className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Thangpa Paintings
            </a>
            <a
              href="#"
              className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Nepali Hemp 
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Beads Mala 
            </a>
            <a
              href="#"
              className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Hand Jewellery
            </a>
          </div>
        </div>
      )}
    </div>
  );
});

export default withClickOutside(Dropdown);
