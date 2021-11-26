import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faSignOutAlt,
  faPlus,
  faArrowUp,
  faCross,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// import SearchInput from '../Components/SearchInput'
import { DEFAULT_USER } from '@helpers/constants'
import roleRus from '@helpers/roleRus'
import DeviceCheck from '@components/DeviceCheck'
import SearchBox from '@admincomponents/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import { Virtuoso } from 'react-virtuoso'
import { postData } from '@helpers/CRUD'
import { setNotificationViewed } from '@state/actions/notificationsActions'
import isDevMode from '@helpers/isDevMode'

const UserMenu = ({
  loggedUser = DEFAULT_USER,
  setPageId = () => {},
  onSignOut = () => {},
  closeMenu = () => {},
}) => {
  return (
    <div className="z-50 -mt-1 -mb-1 h-11 w-11">
      <Menu as="div" className="relative inline-block text-left h-11 w-11">
        {({ open }) => {
          return (
            <>
              <div className="absolute left-0 z-50 h-11 w-11">
                <Menu.Button as="div">
                  <img
                    onClick={() => closeMenu()}
                    className="object-cover rounded-full cursor-pointer h-11 w-11 min-w-9"
                    src={
                      loggedUser.image ??
                      `/img/users/${loggedUser.gender ?? 'noGender'}.jpg`
                    }
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
                  className="absolute w-56 py-1 mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded-md shadow-lg border-primary -top-2 right-5 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div>
                    <div className="flex items-center pt-1 pl-3 pr-6 text-sm italic font-semibold text-gray-900 min-h-11">
                      {loggedUser.name}
                    </div>
                    <div className="flex items-center pb-1 pl-3 pr-6 text-xs italic font-semibold text-gray-900 min-h-11">
                      {roleRus(loggedUser.role)}
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

const itemName = {
  products: { name: 'продукта', modalFuncName: 'openProductModal' },
  sets: { name: 'набора', modalFuncName: 'openSetModal' },
  users: { name: 'пользователя', modalFuncName: 'openUserModal' },
}

const itemStatus = {
  add: { name: 'Добавление', icon: faPlus, color: 'green' },
  update: { name: 'Обновление', icon: faArrowUp, color: 'yellow' },
  delete: { name: 'Удаление', icon: faTrash, color: 'red' },
}

const NotificationButton = ({ modals, loggedUser }) => {
  const [open, setOpen] = useState(false)
  const state = useSelector((state) => state)
  const { notifications } = state

  const notViewedNotifications = notifications.filter((note) => !note.viewed)

  const dispatch = useDispatch()

  return (
    <Popup
      trigger={
        <div className="relative cursor-pointer">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notViewedNotifications.length > 0 && (
            <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-600 rounded-full text-xxs -top-1 -right-1">
              {notViewedNotifications.length}
            </div>
          )}
        </div>
      }
      position="bottom right"
      // on="hover"
      closeOnDocumentClick
      // mouseLeaveDelay={300}
      // mouseEnterDelay={0}
      open={open}
      onOpen={() => setOpen(true)}
      contentStyle={{
        padding: '0px',
        // border: '1px',
        borderColor: 'rgb(38, 163, 212)',
        // width: 240,
      }}
      arrow={false}
      nested
    >
      {notifications.length ? (
        <div
          className="overflow-hidden"
          style={{ height: notifications.length * 49 }}
        >
          <Virtuoso
            data={notifications}
            className="overflow-x-hidden"
            itemContent={(index, note) => {
              // const item = state[note.dbName].find(
              //   (item) => item._id === note.itemId
              // )

              // ${
              //   note.status === 'update' || note.status === 'add'
              //     ? ' cursor-pointer'
              //     : ' cursor-default'
              // }
              return (
                <div
                  key={note._id}
                  className={`border-b border-gray-200 flex items-center px-2 cursor-default
                  
                   gap-x-2 hover:bg-primary ${
                     note.viewed ? ' bg-green-200' : ''
                   }`}
                  onClick={() => {
                    // console.log(`note`, note)
                    if (note.status === 'update' || note.status === 'add')
                      modals[itemName[note.dbName].modalFuncName]({
                        ...note.newItem,
                        _id: note.itemId,
                      })
                    setOpen(false)
                    // postData(
                    //   '/api/usersnotifications',
                    //   { userId: loggedUser._id, notificationId: note._id },
                    //   (data) => {
                    //     console.log(`data`, data)
                    //     dispatch(setNotificationViewed(note._id))
                    //   }
                    // )
                  }}
                  onMouseEnter={() => {
                    if (!note.viewed)
                      postData(
                        '/api/usersnotifications',
                        { userId: loggedUser._id, notificationId: note._id },
                        (data) => dispatch(setNotificationViewed(note._id))
                      )
                  }}
                >
                  {itemStatus[note.status].icon && (
                    <FontAwesomeIcon
                      color={itemStatus[note.status].color}
                      icon={itemStatus[note.status].icon}
                      size="sm"
                    />
                  )}
                  <div className="">
                    <div className="whitespace-nowrap">{`${
                      itemStatus[note.status].name
                    } ${itemName[note.dbName].name}`}</div>
                    <div>
                      {note.status === 'update' || note.status === 'add'
                        ? note.newItem?.name
                          ? `"${note.newItem?.name}"`
                          : '[неизвестный]'
                        : note.oldItem?.name
                        ? `"${note.oldItem?.name}"`
                        : '[неизвестный]'}
                    </div>
                  </div>
                </div>
              )
            }}
          />
        </div>
      ) : (
        <div className="px-2">Нет уведомлений</div>
      )}
    </Popup>
  )
}

const Header = ({
  loggedUser = DEFAULT_USER,
  menuOpen = false,
  setPageId = () => {},
  onClickBurger = () => {},
  closeMenu = () => {},
  onSignOut = () => {},
  modals = null,
}) => {
  return (
    <div
      className={
        'top-0 z-40 border-b' +
        (isDevMode
          ? ' border-red-400 bg-red-400'
          : ' border-primary bg-primary')
      }
    >
      <header className="px-2 phoneH:px-3">
        <div className="flex items-center justify-between gap-1 py-3 border-gray-200 phoneH:gap-2">
          <div className="flex items-center flex-1 gap-1 phoneH:gap-2">
            <Burger
              className="z-20 flex laptop:hidden"
              menuOpen={menuOpen}
              onClick={onClickBurger}
            />
            <SearchBox modals={modals} />
            {/* {loggedUser.role === 'dev' && (
              <DeviceCheck className="text-white text-bold" />
            )} */}
          </div>
          <div className="flex items-center gap-2 phoneH:gap-4">
            {/* <div className="cursor-pointer">
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
            </div> */}
            <NotificationButton modals={modals} loggedUser={loggedUser} />

            <UserMenu
              loggedUser={loggedUser}
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
