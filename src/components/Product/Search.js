import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Search = ({}) => {
  const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          navigate(`/products/${keyword}`);
        } else {
          navigate("/products");
        }
      
      };
    
  return (
    <>
    <div className=''>
      <form className="flex justify-center items-center bg-light-grey w-screen h-screen max-w-full " onSubmit={searchSubmitHandler}>
        <input className='p-2 h-10 border-none outline-none shadow-md w-2/5'
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input className="p-2 border-none outline-none hover:bg-orange-400 h-10 bg-orange-300 w-20"type="submit" value="Search" />
      </form>
      </div>
    </>
  )
}

export default Search