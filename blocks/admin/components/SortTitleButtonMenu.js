import {
  faSort,
  faSortDown,
  faSortUp,
  faSortNumericDownAlt,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faSortNumericDown,
} from '@fortawesome/free-solid-svg-icons'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@components/IconButton'
import { sortingVariables } from '@state/reducers/sortingReducer'
import { setSorting } from '@state/actions/sortingActions'
import { useDispatch } from 'react-redux'

const SortItem = ({
  name,
  iconUp = faSort,
  iconDown = faSort,
  onClickUp = () => console.log(`onClickUp`),
  onClickDown = () => console.log(`onClickDown`),
  active = null, // null / DESC / ASC
}) => {
  return (
    <div className="p-1">
      <div className="relative h-8 cursor-pointer group">
        <div
          onClick={onClickUp}
          className="absolute top-0 bottom-0 left-0 z-50 w-26 group-scope hover:z-40"
        >
          <div
            className={
              'flex items-center w-10 h-full px-2 rounded-l-lg group-scope-hover:bg-primary group-scope-hover:text-white ' +
              (active === 'DESC' ? 'text-white bg-toxic' : 'text-primary')
            }
          >
            <FontAwesomeIcon className="w-5 h-5" icon={iconUp} />
          </div>
        </div>
        <div
          className={
            'absolute top-0 bottom-0 z-10 flex items-center justify-center rounded-lg left-8 right-8 group-hover:bg-primary group-hover:text-white ' +
            (active ? ' text-white bg-toxic' : '')
          }
        >
          {name}
        </div>
        <div
          onClick={onClickDown}
          className="absolute top-0 bottom-0 right-0 z-50 flex justify-end w-26 group-scope hover:z-40"
        >
          <div
            className={
              'flex items-center justify-end w-10 h-full px-2 rounded-r-lg group-scope-hover:bg-primary group-scope-hover:text-white ' +
              (active === 'ASC' ? 'text-white bg-toxic' : 'text-primary')
            }
          >
            <FontAwesomeIcon className="w-5 h-5" icon={iconDown} />
          </div>
        </div>
      </div>
    </div>
  )
}

const SortTitleButtonMenu = ({ state, variable }) => {
  const buttonRef = useRef()
  const dispatch = useDispatch()

  const onClickUp = (key) => dispatch(setSorting({ [variable]: [key, 'DESC'] }))

  const onClickDown = (key) =>
    dispatch(setSorting({ [variable]: [key, 'ASC'] }))

  const sortItems = []
  for (const [key, value] of Object.entries(sortingVariables[variable])) {
    const numericValue =
      key === 'price' ||
      key === 'count' ||
      key === 'date' ||
      key === 'purchasedAt' ||
      key === 'createdAt'
    sortItems.push(
      <SortItem
        key={key}
        name={value}
        // iconUp={faSortAmountUp}
        // iconDown={faSortAmountDown}
        onClickUp={() => {
          buttonRef.current?.click()
          onClickUp(key)
        }}
        onClickDown={() => {
          buttonRef.current?.click()
          onClickDown(key)
        }}
        active={
          state.sorting[variable][0] === key ? state.sorting[variable][1] : null
        }
        iconUp={numericValue ? faSortNumericDownAlt : faSortAlphaDownAlt}
        iconDown={numericValue ? faSortNumericDown : faSortAlphaDown}
      />
    )
  }
  const key = state.sorting[variable][0]
  const value = state.sorting[variable][1]
  const numericValue =
    key === 'price' ||
    key === 'count' ||
    key === 'date' ||
    key === 'purchasedAt' ||
    key === 'createdAt'
  const activeIcon = numericValue
    ? value === 'DESC'
      ? faSortNumericDownAlt
      : faSortNumericDown
    : value === 'DESC'
    ? faSortAlphaDownAlt
    : faSortAlphaDown

  return (
    // <div className="z-20 ml-5 -mt-1 -mb-1 h-11 w-11">
    <Menu as="div" className="relative z-40 inline-block h-10 text-left">
      {({ open }) => {
        return (
          <>
            <div className="z-50 h-11">
              <Menu.Button as="div" ref={buttonRef}>
                {/* <img
                  // onClick={() => closeMenu()}
                  className="object-cover rounded-full cursor-pointer h-11 w-11 min-w-9"
                  // src={user.image}
                  alt="Avatar"
                /> */}
                {/* <FontAwesomeIcon
                  className={'w-5 h-5 text-white border-2 border-blue-700'}
                  icon={faSort}
                /> */}
                <IconButton
                  inverse
                  icon={activeIcon}
                  name={sortingVariables[variable][state.sorting[variable][0]]}
                  textPos="left"
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
                className="absolute right-0 z-0 w-56 py-1 mt-2 origin-top-right bg-white border divide-y divide-gray-100 rounded-md shadow-lg rounded-tr-xl border-primary -top-2 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="flex items-center pl-3 pr-6 text-sm italic font-semibold text-gray-900 h-9">
                  Сортировка
                </div>
                <div
                  className={'absolute -top-0.5'}
                  style={{ right: '-0.1rem' }}
                >
                  <IconButton
                    inverse
                    icon={activeIcon}
                    onClick={() => buttonRef.current?.click()}
                  />
                </div>

                {sortItems}
              </Menu.Items>
            </Transition>
          </>
        )
      }}
    </Menu>
    // </div>
  )
}

export default SortTitleButtonMenu
