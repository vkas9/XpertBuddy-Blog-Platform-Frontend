import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogAction } from "../../../redux/blogStore";
import { logout } from "../../../APIs/api";
import { useNavigate } from "react-router-dom";

const SidebarBlog = ({ closeDrawer }) => {
  const { allBlog, activeTab, isModalOpen } = useSelector(
    (store) => store.blogStore
  );
  const { userCredentials, token } = useSelector((store) => store.credential);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter liked blogs memoized
  const filterLikedBlog = useMemo(
    () =>
      allBlog?.filter((item) => item?.likes?.includes(userCredentials?._id)),
    [allBlog, userCredentials?._id]
  );

  // Handle section selection
  const handleSelect = async (section) => {
    if (closeDrawer) closeDrawer();

    dispatch(blogAction.setActiveTab(section));
    localStorage.setItem("active-tab", JSON.stringify({ current: section }));

    if (section === "Log out") {
      await dispatch(logout(navigate));
    } else if (section === "Make Blog") {
      dispatch(blogAction.setIsModalOpen(!isModalOpen));
    } else {
      navigate(
        token
          ? `/social-hub/${section.toLowerCase().replace(/\s/g, "-")}`
          : "/login"
      );
    }
  };

  // Sidebar menu items
  const menuItems = [
    { label: "All Blogs", count: allBlog?.length },
    {
      label: "My Blogs",
      count: userCredentials?.blogs?.length,
      requiresAuth: true,
    },
    {
      label: "Liked Blogs",
      count: filterLikedBlog?.length,
      requiresAuth: true,
    },
    { label: "Make Blog", requiresAuth: true },
  ];

  const profileItems = [
    { label: "My Profile", requiresAuth: true },
    { label: "Settings", requiresAuth: true },
    { label: "Log out", requiresAuth: true, className: "text-red-500" },
  ];

  const renderMenu = (items) =>
    items.map(({ label, count, requiresAuth, className }) => {
      const isDisabled = requiresAuth && !token;
      return (
        <li
          key={label}
          className={`p-3 mb-2 max-sm:text-center cursor-pointer hover:bg-white/10 rounded-lg ${
            activeTab === label ? "bg-white/10" : ""
          } ${isDisabled ? "text-white/50 cursor-not-allowed" : ""} ${
            className || ""
          }`}
          onClick={!isDisabled ? () => handleSelect(label) : undefined}
        >
          <div className="flex items-center justify-between">
            <span>{label}</span>
            {count !== undefined && (
              <span className="text-white/40">{count}</span>
            )}
          </div>
        </li>
      );
    });

  return (
    <div className="w-64 h-full flex flex-col font-semibold text-md justify-between sm:bg-white/10 text-white">
      {/* Main menu */}
      <div className="p-2">
        <ul>{renderMenu(menuItems)}</ul>
      </div>

      <div className="min-h-[1px] sm:hidden bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

      {/* Profile menu */}
      {token && (
        <div className="p-2">
          <ul>{renderMenu(profileItems)}</ul>
        </div>
      )}
    </div>
  );
};

export default SidebarBlog;
