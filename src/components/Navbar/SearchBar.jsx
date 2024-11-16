import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const navigate=useNavigate();
    const current = location.pathname.split("/")[1];
    const handleChange=()=>{
        if(current!=="social-hub") navigate("social-hub/all-blogs")

    }
  return (
    <div
      className={`  ${
        isFocused ? "ring-1 border-blue-500 outline-none" : ""
      }  bg-white/10 pl-4  absolute  max-sm:hidden  left-0 right-0 mx-auto py-1 overflow-hidden gap-2  w-[30%] rounded-full min-h-[35px]  `}
    >
        <input type="text" onChange={handleChange} placeholder='Search Blogs...'  className='bg-transparent text-[1rem] w-full outline-none' />
      
      
    </div>
  )
}

export default SearchBar
