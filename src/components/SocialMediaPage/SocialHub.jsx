import React from "react";
import SidebarBlog from "./SidebarBlog/SidebarBlog";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

const SocialHub = () => {
  const { allBlog, activeTab } = useSelector((store) => store.blogStore);
  const { token } = useSelector((store) => store.credential);


  return (
    <div className="h-[calc(100vh-(45px))] sm:h-[calc(100vh-(61px))] flex overflow-y-auto">
      {token && (
        <div className="h-full max-sm:hidden flex items-start">
          <SidebarBlog />
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default SocialHub;
