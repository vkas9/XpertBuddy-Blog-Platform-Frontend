import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer"
import { GiHamburgerMenu } from "react-icons/gi"
import UserAuth from "./UserAuth"

export function DrawerDemo({className}) {
  const [open, setOpen] = React.useState(false)

  const closeDrawer = () => {
    setOpen(false)
  }


  return (
    <div className={`${className}`}>

<Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="p-2">
          <GiHamburgerMenu size={27} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto px-[1rem]  py-[2rem] w-full max-w-sm">
          <UserAuth closeDrawer={closeDrawer} />
        </div>
      </DrawerContent>
    </Drawer>
    </div>
  )
}