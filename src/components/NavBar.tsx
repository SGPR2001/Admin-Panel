import React, { ReactNode, useState } from 'react'
import { mdiClose, mdiDotsVertical } from '@mdi/js'
import { containerMaxW } from '../config'
import BaseIcon from './BaseIcon'
import NavBarItemPlain from './NavBarItemPlain'
import NavBarMenuList from './NavBarMenuList'
import { MenuNavBarItem } from '../interfaces'
import Image from 'next/image'
import pic from '../logo.png'

type Props = {
  menu: MenuNavBarItem[]
  className: string
  children: ReactNode
}

export default function NavBar({ menu, className = '', children }: Props) {
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false)

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive)
  }

  return (
    <nav
      className={` top-0 inset-0 fixed bg-gray-700 h-16 z-30 transition-position w-screen lg:w-auto dark:bg-slate-800`}
    >
      <div className={`flex lg:items-stretch`}>
        
        <div className="ml-12 bg-gray-50 shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none dark:bg-slate-800 ">
          <Image src={pic} width={135} height={90} alt="image" />
        </div>
        <div className="flex flex-1 items-stretch h-14 ml-2">{children}</div>

        <div className="flex-none items-stretch flex h-14 lg:hidden">
          <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
            <BaseIcon path={isMenuNavBarActive ? mdiClose : mdiDotsVertical} size="24" />
          </NavBarItemPlain>
        </div>
        <div
          className={`${
            isMenuNavBarActive ? 'block' : 'hidden'
          } max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-14 left-0 bg-gray-50 shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none dark:bg-slate-800`}
        >
          {/* <Image src={pic} width={130} height={120} alt="image" /> */}
          <NavBarMenuList menu={menu} />
        </div>
      </div>
    </nav>
  )
}
