import versionHistory from '@helpers/versionHistory'
import React, { useEffect } from 'react'
import cn from 'classnames'
import { useState } from 'react'
import {
  faUser,
  faSignOutAlt,
  faPlus,
  faArrowUp,
  faCross,
  faTrash,
  faChartBar,
  faBars,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'

const MenuItem = ({
  item,
  setPageId = () => {},
  active = false,
  groupIsActive,
}) => {
  return (
    <a
      // className="flex items-center justify-between px-3 py-1 mt-2 duration-300 bg-gray-200 rounded-lg cursor-pointer flex-nowrap hover:bg-hover"
      className={cn(
        'flex items-center justify-between mb-1 duration-300 rounded-lg cursor-pointer group-hover:text-primary flex-nowrap hover:bg-primary',
        groupIsActive ? 'text-primary' : 'text-white'
      )}
      onClick={() => {
        setPageId(item.id)
      }}
    >
      <div className="w-full px-3 py-1 hover:text-white">
        <span className={'text-sm font-medium whitespace-nowrap'}>
          {item.name}
        </span>
        {item.num !== null && (
          <span className="text-xs font-semibold text-gray-700">
            {item.num}
          </span>
        )}
      </div>
    </a>
  )
}

const Menu = ({
  menuCfg,
  setPageId,
  activePageId,
  minimized,
  setMinimized,
}) => {
  const [openedMenuIndex, setOpenedMenuIndex] = useState(1)
  const variants = {
    show: { height: 'auto' },
    hide: { height: 0 },
  }

  useEffect(() => {
    if (minimized) setOpenedMenuIndex(null)
  }, [minimized])

  const indexOfActiveGroup = menuCfg.findIndex((item) =>
    item.items.find((item) => item.id === activePageId)
  )

  return (
    <nav className="flex flex-col h-full mt-5 gap-y-2">
      {menuCfg &&
        menuCfg.length > 0 &&
        menuCfg.map((item, index) => {
          const groupIsActive = index === indexOfActiveGroup
          return (
            <>
              {item.bottom && !menuCfg[index - 1].bottom && (
                <div className="flex-1" />
              )}
              <div
                className={cn(
                  'text-white duration-300 rounded-lg group',
                  groupIsActive
                    ? 'bg-white text-primary'
                    : 'hover:bg-white hover:text-primary'
                )}
                key={'groupMenu' + index}
              >
                <button
                  className="flex items-center w-full px-2 py-2 min-w-12 min-h-12"
                  onClick={() => {
                    if (item.items.length === 1) {
                      setPageId(item.items[0].id)
                      setMinimized(true)
                    } else {
                      setOpenedMenuIndex(
                        openedMenuIndex === index ? null : index
                      )
                      setMinimized(false)
                    }
                  }}
                >
                  <div className="flex justify-center min-w-8 max-w-8 min-h-8 max-h-8">
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                  </div>
                  <h3 className="flex-1 ml-5 font-semibold tracking-wide text-left uppercase whitespace-nowrap">
                    {item.items.length === 1 ? item.items[0].name : item.name}
                  </h3>
                  {item.items.length > 1 && (
                    <div
                      className={cn('w-4 duration-300 transition-transform', {
                        'rotate-180': openedMenuIndex === index,
                      })}
                    >
                      <FontAwesomeIcon icon={faAngleDown} size="lg" />
                    </div>
                  )}
                </button>
                {item.items.length > 1 && (
                  <motion.div
                    variants={variants}
                    initial="hide"
                    animate={openedMenuIndex === index ? 'show' : 'hide'}
                    className="ml-10 mr-2 overflow-hidden"
                  >
                    {item.items.map((subitem, index) => (
                      <MenuItem
                        key={'menu' + subitem.id}
                        item={subitem}
                        setPageId={(id) => {
                          setOpenedMenuIndex(null)
                          setMinimized(true)
                          setPageId(id)
                        }}
                        groupIsActive={groupIsActive}
                        active={activePageId === subitem.id}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </>
          )
        })}
    </nav>
  )
}

const SidePanel = ({
  menuCfg,
  menuOpen,
  setPageId,
  activePageId = () => {},
  closeMenu = () => {},
  modals,
}) => {
  const [minimized, setMinimized] = useState(true)

  const variants = {
    min: { width: 64 },
    max: { width: 280 },
  }

  return (
    <div className="w-16 sidebar">
      <motion.div
        className={
          'z-50 bg-primary overflow-x-hidden h-full absolute top-0 left-0'
          // 'sidepanel fixed laptop:static w-64 h-full pb-15 laptop:pb-0 max-h-screen left-0 top-menu laptop:top-0 z-40 transform duration-300 border-t border-primary laptop:border-t-0 bg-white' +
          // (!menuOpen
          //   ? ' scale-x-0 -translate-x-32 w-0 laptop:w-64 laptop:transform-none'
          //   : '')
        }
        variants={variants}
        animate={minimized ? 'min' : 'max'}
        transition={{ duration: 0.5, type: 'tween' }}
        initial={'min'}
        layout
      >
        <div className="flex flex-col h-full px-2 py-3 overflow-x-hidden overflow-y-auto border-r border-primary">
          <div className="flex items-center justify-start ml-2">
            <button
              className="w-8 cursor-pointer min-w-8"
              onClick={() => setMinimized((state) => !state)}
            >
              <FontAwesomeIcon icon={faBars} size="2x" className="text-white" />
            </button>
            <div className="flex items-center justify-start px-6 ml-2 rounded-3xl gap-x-2 flex-nowrap">
              <img
                src="/img/balloon.webp"
                alt="balloon"
                width={40}
                height={40}
              />
              <div className="text-lg leading-4 text-white font-futuraDemi">
                Обними
                <br />
                шарик
              </div>
            </div>
          </div>
          <Menu
            menuCfg={menuCfg}
            setPageId={(id) => {
              setPageId(id)
              closeMenu()
            }}
            minimized={minimized}
            setMinimized={setMinimized}
            activePageId={activePageId}
          />
          <div className="flex flex-col items-center justify-end flex-1 mt-2">
            <div
              onClick={() => modals.openVersionHistoryModal()}
              className="text-sm text-white cursor-pointer opacity-690"
            >{`v. ${versionHistory[0].ver}`}</div>
          </div>
        </div>
        {/* <div className="z-0 flex-col justify-end flex-1 hidden w-full px-3 m-auto mt-6 opacity-100 lg:flex">
            <img className="object-contain" src={Aik1_alt} alt="logo" />
          </div> */}
      </motion.div>
    </div>
  )
}

export default SidePanel
