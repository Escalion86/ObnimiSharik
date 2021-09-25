import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// import SearchInput from '../Components/SearchInput'
import { DEFAULT_USER } from '@helpers/constants'
import roleRus from '@helpers/roleRus'
import DeviceCheck from '@components/DeviceCheck'

const UserMenu = ({
  user = DEFAULT_USER,
  setPageId = () => {},
  onSignOut = () => {},
  closeMenu = () => {},
}) => {
  return (
    <div className="z-50 ml-5 -mt-1 -mb-1 h-11 w-11">
      <Menu as="div" className="relative inline-block text-left h-11 w-11">
        {({ open }) => {
          return (
            <>
              <div className="absolute left-0 z-50 h-11 w-11">
                <Menu.Button as="div">
                  <img
                    onClick={() => closeMenu()}
                    className="object-cover rounded-full cursor-pointer h-11 w-11 min-w-9"
                    src={user.image}
                    alt="Avatar"
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute z-0 w-56 py-1 mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded-md shadow-lg border-primary -top-2 right-5 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div>
                    <div className="flex items-center pt-1 pl-3 pr-6 text-sm italic font-semibold text-gray-900 min-h-11">
                      {user.name}
                    </div>
                    <div className="flex items-center pb-1 pl-3 pr-6 text-xs italic font-semibold text-gray-900 min-h-11">
                      {roleRus(user.role)}
                    </div>
                  </div>
                  <div className="px-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                          onClick={() => setPageId(5)}
                        >
                          {active ? (
                            <FontAwesomeIcon
                              className="w-5 h-5 mr-2 text-white"
                              icon={faUser}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="w-5 h-5 mr-2 text-primary"
                              icon={faUser}
                            />
                          )}
                          Параметры учетной записи
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                          onClick={onSignOut}
                        >
                          {active ? (
                            <FontAwesomeIcon
                              className="w-5 h-5 mr-2 text-white"
                              icon={faSignOutAlt}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="w-5 h-5 mr-2 text-primary"
                              icon={faSignOutAlt}
                            />
                          )}
                          Сменить учетную запись
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )
        }}
      </Menu>
    </div>
  )
}

const Burger = ({
  menuOpen = () => {},
  onClick = () => {},
  className = '',
}) => {
  return (
    <div
      className={
        'menu-btn' +
        (menuOpen ? ' open' : '') +
        (className ? ' ' + className : '')
      }
      onClick={onClick}
    >
      <div className="menu-btn__burger" />
    </div>
  )
}

const Header = ({
  user = DEFAULT_USER,
  menuOpen = false,
  setPageId = () => {},
  onClickBurger = () => {},
  closeMenu = () => {},
  onSignOut = () => {},
}) => {
  return (
    <div className="top-0 z-30 border-b border-primary bg-primary">
      <header className="px-6">
        <div className="flex items-center justify-between py-3 border-gray-200">
          <div className="flex items-center flex-1 gap-2">
            <Burger
              className="z-20 flex laptop:hidden"
              menuOpen={menuOpen}
              onClick={onClickBurger}
            />
            {user.role === 'dev' && (
              <DeviceCheck className="text-white text-bold" />
            )}
          </div>
          <div className="flex items-center">
            <div className="ml-5 cursor-pointer">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>

            <UserMenu
              user={user}
              setPageId={setPageId}
              onSignOut={onSignOut}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
