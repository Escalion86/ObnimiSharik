import React, { useState } from 'react'
// import axios from 'axios'
// import logo from './logo.svg'

import SidePanel from '@adminblocks/SidePanel'
import Header from '@adminblocks/Header'
import { DEFAULT_USER } from '@helpers/constants'
// import Account from './PageContent/Account'
// import Title from './Components/Title'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cabinet = ({
  page,
  setPageId,
  // courses,
  menuCfg,
  user = DEFAULT_USER,
  // setUser,
  onSignOut,
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  // const [splashShow, setSplashShow] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className="flex h-screen max-h-screen overflow-y-hidden">
      <SidePanel
        menuCfg={menuCfg}
        menuOpen={menuOpen}
        setPageId={setPageId}
        activePageId={page.id}
        closeMenu={closeMenu}
      />
      <div
        className="relative grid flex-1 max-h-screen min-w-0 "
        style={{ gridTemplateRows: '3.8rem 1fr' }}
      >
        <Header
          user={user}
          menuOpen={menuOpen}
          setPageId={setPageId}
          onClickBurger={toggleMenu}
          closeMenu={closeMenu}
          onSignOut={onSignOut}
        />
        {children}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cabinet
