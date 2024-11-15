import { blogAction } from "@/redux/blogStore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const { userCredentials } = useSelector((store) => store.credential);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.setItem(
      "active-tab",
      JSON.stringify({ current: "My Profile" })
    );
    dispatch(blogAction.setActiveTab("My Profile"));
    navigate("/social-hub");
  };
  return (
    <button
      onClick={handleClick}
      className="w-[44px]  h-[44px] overflow-hidden rounded-full flex items-center justify-center bg-cover "
    >
      <div className="rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px] ">
        <img
          src={
            userCredentials?.profile?.user_profile_image ||
            `https://api.dicebear.com/8.x/pixel-art/svg?seed=${"User"}`
          }
          alt={userCredentials?.profile?.user_profile_image}
          className=" h-[30px] w-[30px] md:h-[40px] md:w-[40px]  object-cover rounded-full"
        />
      </div>
    </button>
  );
};

export default ProfileDropdown;
