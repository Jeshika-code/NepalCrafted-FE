import React, { useState } from "react";
import logo from "../../logo-no-background.png";
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import UserOptions from "./UserOptions";
// import Dropdown from "../Dropdown";

const Header = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Product", link: "/products" },
    { name: "Contact", link: "/" }, 
  ];
  let [open, setOpen] = useState(false);

  return (
    <header className="shadow-md w-full fixed top-0 left-0  ">
      <div className=" md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div>
          <img className="h-8 lg:h-10" src={logo} alt="logo"/>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-5 top-5 cursor-pointer md:hidden w-6 h-7"
        >
          {open ? (
            <XMarkIcon className="hover:text-text-orange" />
          ) : (
            <Bars3Icon className="hover:text-text-orange" />
          )}
        </div>
        {/* link items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition duration-100 ease-in ${
            open ? "top-15" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <Link 
              to={link.link}
                className="text-text-grey hover:text-text-orange duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
        
          <div className="font-bold text-2xl cursor-pointer flex items-center  gap-2 md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ">
            <Link to="/search">
            <MagnifyingGlassIcon className=" md:ml-8 md:my-0 my-7 w-5 h-5 m-2 hover:text-button-orange transition-all duration-500 ease-in"/>
            </Link>
          <Link to="/login"> <UserCircleIcon className="'w-5 hover:text-button-orange h-5 m-2 transition-all duration-500 ease-in" /></Link>
          {/* <UserOptions/> */}
           
            <ShoppingCartIcon className="'w-5 hover:text-button-orange transition-all duration-500 ease-in h-5 m-2" />
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
