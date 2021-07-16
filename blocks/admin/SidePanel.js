import React from 'react'

// import Logo from '../../public/img/'
// import Aik1_alt from '../../img/aik1_alt.png'

const MenuItem = ({ item, setPageId = () => {}, active = false }) => {
  return (
    <div className="mt-2 -mx-3">
      <a
        className="flex items-center justify-between px-3 py-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-hover"
        onClick={() => {
          setPageId(item.id)
        }}
      >
        <span
          className={
            'text-sm font-medium ' + (active ? 'text-primary' : 'text-gray-700')
          }
        >
          {item.name}
        </span>
        {item.num !== null && (
          <span className="text-xs font-semibold text-gray-700">
            {item.num}
          </span>
        )}
      </a>
    </div>
  )
}

const Menu = ({ menuCfg, setPageId, activePageId }) => {
  return (
    <nav className="mt-2">
      {menuCfg &&
        menuCfg.length > 0 &&
        menuCfg.map((item, index) => (
          <div key={'groupMenu' + index}>
            <h3 className="mt-6 text-xs font-semibold tracking-wide text-gray-600 uppercase">
              {item.name}
            </h3>
            {item.items.length > 0 &&
              item.items.map((subitem, index) => (
                <MenuItem
                  key={'menu' + subitem.id}
                  item={subitem}
                  setPageId={setPageId}
                  active={activePageId === subitem.id}
                />
              ))}
          </div>
        ))}
    </nav>
  )
}

const SidePanel = ({
  menuCfg,
  menuOpen,
  setPageId,
  activePageId = () => {},
  closeMenu = () => {},
}) => {
  return (
    <div
      className={
        'fixed laptop:static w-64 h-screen max-h-screen left-0 top-menu laptop:top-0 z-10 transform duration-300 border-t border-primary laptop:border-t-0 bg-white' +
        (!menuOpen
          ? ' scale-x-0 -translate-x-32 w-0 laptop:w-64 laptop:transform-none'
          : '')
      }
    >
      <div className="h-full laptop:block">
        <div className="flex flex-col w-64 h-full px-8 py-4 overflow-y-hidden bg-gray-100 border-r border-primary laptop:fixed z-1">
          <div className="z-10">
            {/* <img className="px-4" src={Logo} alt="logo" /> */}
            <img src="/img/balloon.webp" alt="balloon" width={40} height={40} />
            <Menu
              menuCfg={menuCfg}
              setPageId={(id) => {
                setPageId(id)
                closeMenu()
              }}
              activePageId={activePageId}
            />
          </div>
          {/* <div className="z-0 flex-col justify-end flex-1 hidden w-full px-3 m-auto mt-6 opacity-100 lg:flex">
            <img className="object-contain" src={Aik1_alt} alt="logo" />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SidePanel
