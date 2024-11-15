
import React from 'react'
import { Link } from 'react-router-dom'


const UserAuth = ({ closeDrawer }) => {
  return (
    <>
    
      <div className="gap-4  flex-col sm:flex-row flex">
        <Link
          to={"/login"}
          onClick={closeDrawer}
          className="bg-white/10 text-center text-white hover:bg-white/20 transition-all duration-100 py-2 px-6 rounded-md font-bold text-md"
        >
          Log in
        </Link>
        <Link
          to={"/signup"}
          onClick={closeDrawer}
          className="bg-white/10 text-center text-white hover:bg-white/20 transition-all duration-100 py-2 px-6 rounded-md font-bold text-md"
        >
          Sign up
        </Link>
      </div>
    </>
  )
}

export default UserAuth