import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import menuAside from '../menuAside'
// import getMenuAside from '../menuAside'
import AsideMenu from '../components/AsideMenu'
import NavBar from '../components/NavBar'
import { useAppSelector,useAppDispatch } from '../stores/hooks'
import menuNavBar from '../menuNavBar'
import { useRouter } from 'next/router'
import NavBarItemPlain from '../components/NavBarItemPlain'
import { mdiBackburger, mdiForwardburger,mdiMenu } from '@mdi/js'
import BaseIcon from '../components/BaseIcon'
import Image from 'next/image'
type Props = {
  children: ReactNode
}


export default function LayoutAuthenticated({ children }: Props) {
  
    // const [menuAside, setMenuAside] = useState([])

    // useEffect(() => {
    //   getMenuAside()
    //     .then((modifiedMenuAside) => {
    //       setMenuAside(modifiedMenuAside)
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }, [])
  const darkMode = useAppSelector((state) => state.style.darkMode)

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false)
      setIsAsideLgActive(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart) 

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.events])

  const layoutAsidePadding = 'xl:pl-60'
  

  return (
    <div className={`${darkMode ? 'dark' : ''} overflow-hidden lg:overflow-visible`}>
      <div
        className={`${layoutAsidePadding} ${
          isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
        } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
      >
       
          <NavBar
            menu={menuNavBar}
            className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
          >
            <NavBarItemPlain
              display="flex lg:hidden"
              onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
            >
              <BaseIcon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
            </NavBarItemPlain>
            <NavBarItemPlain
              display="hidden lg:flex xl:hidden"
              onClick={() => setIsAsideLgActive(true)}
            >
              <BaseIcon path={mdiMenu} size="24" />
            </NavBarItemPlain>
          </NavBar>
       
        
          <AsideMenu
            isAsideMobileExpanded={isAsideMobileExpanded}
            isAsideLgActive={isAsideLgActive}
            menu={menuAside}
            onAsideLgClose={() => setIsAsideLgActive(false)}
          />
          
        
        {children}
      </div>
    </div>
  )
}
