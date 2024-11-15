import React from "react";
import { IoMdClose } from "react-icons/io";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { FiSidebar } from "react-icons/fi";

import SidebarBlog from "../SocialMediaPage/SidebarBlog/SidebarBlog";

const OpenCloseSidebar = ({ className }) => {
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <div className={`${className}`}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="p-2">
            {!open ? (
              <FiSidebar className="sm:hidden" size={25} />
            ) : (
              <IoMdClose className="sm:hidden " size={25} />
            )}
          </button>
        </DrawerTrigger>
        <DrawerContent
          className={` bg-gradient-to-b border-none   to-transparent`}
        >
          <div className="mx-auto flex items-center justify-center px-[1rem] pb-[.5rem] w-full max-w-sm ">
            <SidebarBlog closeDrawer={closeDrawer} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default OpenCloseSidebar;
