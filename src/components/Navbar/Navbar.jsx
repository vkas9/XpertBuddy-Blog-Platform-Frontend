import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { GiHamburgerMenu } from "react-icons/gi";
import { DrawerDemo } from "./Popup";
import OpenCloseSidebar from "./OpenCloseSidebar";
import BlogModal from "../SocialMediaPage/MakeBlog/BlogModal";
import { blogAction } from "@/redux/blogStore";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(blogAction.setActiveTab("All Blogs"));
  };
  const location = useLocation();
  const { isModalOpen, blogUpdating } = useSelector((store) => store.blogStore);
  const { token } = useSelector((store) => store.credential);
  const current = location.pathname.split("/")[1];
  return (
    <div className="relative text-xl font-bold ">
      <div className="flex items-center py-2 px-3   justify-between ">
        <Link to="/" className="font-bold">
          XpertBuddy
        </Link>
        <SearchBar />
        <div className="flex  h-full  items-center justify-between gap-1">
          <OpenCloseSidebar className={`${!current && "hidden"} sm:hidden`} />
          <Link
            to={"/social-hub/all-blogs"}
            onClick={handleClick}
            className={`rounded-full ${current ? "max-sm:hidden" : ""} ${
              current == "social-hub" ? "bg-white/10" : ""
            } hover:bg-white/10 max-sm:bg-white/10 px-3 py-2 transition-all whitespace-nowrap duration-100`}
          >
            Blogs Section
          </Link>
          <div className="min-h-[44px] w-[1px]  bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>

          {!token ? (
            <>
              <DrawerDemo className={"sm:hidden"} />
              <div className="flex max-sm:hidden gap-1 items-center">
                <Link
                  to={"/signup"}
                  className={`rounded-full ${
                    current == "signup" ? "bg-white/10" : ""
                  } hover:bg-white/10 px-3 py-2 transition-all duration-100`}
                >
                  Sign up
                </Link>
                <Link
                  to={"/login"}
                  className={`rounded-full ${
                    current == "login" ? "bg-white/10" : ""
                  } hover:bg-white/10 px-3 py-2 transition-all duration-100`}
                >
                  Log in
                </Link>
              </div>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
      <div className="min-h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      {(isModalOpen || blogUpdating) && <BlogModal />}
    </div>
  );
};

export default Navbar;
