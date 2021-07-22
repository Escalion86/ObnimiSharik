import React, { useState } from 'react'
// import axios from 'axios'
// import logo from './logo.svg'

import SidePanel from '@blocks/admin/SidePanel'
import Header from '@blocks/admin/Header'
import { DEFAULT_USER } from '@helpers/constants'
// import Account from './PageContent/Account'
// import Title from './Components/Title'

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
    <div className="flex h-screen max-h-screen">
      <SidePanel
        menuCfg={menuCfg}
        menuOpen={menuOpen}
        setPageId={setPageId}
        activePageId={page.id}
        closeMenu={closeMenu}
      />
      <div className="relative flex flex-col flex-1 min-w-0">
        <Header
          user={user}
          menuOpen={menuOpen}
          setPageId={setPageId}
          onClickBurger={toggleMenu}
          closeMenu={closeMenu}
          onSignOut={onSignOut}
        />
        <main className="flex flex-col flex-1 px-3 pb-3">{children}</main>
      </div>
    </div>
  )
}

export default Cabinet
