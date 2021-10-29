import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faPlus,
  faSearch,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import {
  OrderItem,
  ProductItem,
  SetItem,
  PersonaItem,
  PaymentItem,
  DistrictItem,
} from './ItemCards'
// import useClickOutside from '@helpers/hooks/21-useClickOutside/useClickOutside'

const filteredItems = (
  items = [],
  searchText = '',
  exceptedIds = [],
  rules = []
) =>
  (searchText || exceptedIds?.length || rules?.length
    ? items.filter((item) => {
        if (Object.entries(rules).length)
          for (const [key, rule] of Object.entries(rules)) {
            if (rule[0] === '>') {
              if (rule[1] === '=') {
                if (!(item[key] >= parseInt(rule.substr(2)))) return false
              } else if (!(item[key] > parseInt(rule.substr(1)))) return false
            }
            if (rule[0] === '<') {
              if (rule[1] === '=') {
                if (!(item[key] <= parseInt(rule.substr(2)))) return false
              } else if (!(item[key] < parseInt(rule.substr(1)))) return false
            }
            if (rule[0] === '=') {
              if (!(item[key] == parseInt(rule.substr(1)))) return false
            }
          }

        if (searchText[0] === '>') {
          if (searchText[1] === '=')
            return item.price >= parseInt(searchText.substr(2)) * 100
          return item.price > parseInt(searchText.substr(1)) * 100
        }
        if (searchText[0] === '<') {
          if (searchText[1] === '=')
            return item.price <= parseInt(searchText.substr(2)) * 100
          return item.price < parseInt(searchText.substr(1)) * 100
        }
        if (searchText[0] === '=') {
          return item.price == parseInt(searchText.substr(1)) * 100
        }

        const searchTextLowerCase = searchText.toLowerCase()
        // const itemNameLowerCase = item.name?.toLowerCase()
        return (
          !exceptedIds.includes(item._id) &&
          (item.name?.toString().toLowerCase().includes(searchTextLowerCase) ||
            item.number?.toString().includes(searchTextLowerCase) ||
            item.article?.toString().includes(searchTextLowerCase) ||
            item.phone?.toString().includes(searchTextLowerCase) ||
            item.whatsapp?.toString().includes(searchTextLowerCase) ||
            item.price?.toString().includes(searchTextLowerCase))
          // ||
          // item.fullPrice?.toString().includes(searchTextLowerCase)
        )
      })
    : items
  ).sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

export const SelectItem = ({
  items,
  itemComponent = ProductItem,
  onChange,
  selectedId = null,
  exceptedIds = [],
  className = '',
  dropDownList = true,
  onClick = null,
  itemHeight = 40,
  noSearch = false,
  itemWidth = 0,
  moreOneFilterTurnOn = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [moreOneFilter, setMoreOneFilter] = useState(moreOneFilterTurnOn)

  const ref = useRef()
  const inputRef = useRef()

  // useClickOutside(inputRef, () => {
  //   console.log(`OUTSIDE`)
  //   if (isMenuOpen) setIsMenuOpen(false)
  // })

  const selectedItem = selectedId
    ? items.find((item) => item._id === selectedId)
    : null

  const Item = itemComponent

  const filteredItemsArray = isMenuOpen
    ? filteredItems(
        items,
        searchText,
        exceptedIds,
        moreOneFilter ? { count: '>0' } : {}
      )
    : []

  const toggleIsMenuOpen = () => setIsMenuOpen((state) => !state)

  useEffect(() => {
    // console.log(`ref.current`, ref.current)
    const checkIfClickedOutside = (e) => {
      // console.log(
      //   `ref.current.contains(e.target)`,
      //   ref.current.contains(e.target)
      // )
      if (
        dropDownList &&
        isMenuOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    if (isMenuOpen && !noSearch) inputRef.current.focus()

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [dropDownList, isMenuOpen, ref, inputRef])

  return (
    <div
      className={
        (className ? className + ' ' : '') +
        'relative bg-gray-200 cursor-pointer flex justify-center items-center'
      }
      style={{ height: itemHeight, width: itemWidth }}
      onClick={() => {
        if (dropDownList) toggleIsMenuOpen()
        if (onClick) onClick(selectedItem)
      }}
      ref={ref}
    >
      {dropDownList && (
        <div
          className={
            'absolute overflow-hidden max-h-64 transform duration-300 ease-out flex flex-col top-full left-0 right-0 bg-white shadow-sm border border-gray-700 z-50 ' +
            (isMenuOpen ? '' : 'opacity-0') // scale-y-0 -translate-y-1/2
          }
          // style={{ width: itemWidth }}
          onClick={(e) => e.stopPropagation()}
        >
          {!noSearch && (
            <div
              className={
                'flex gap-1 items-center border-gray-700 border-b p-1 ' +
                (isMenuOpen ? '' : 'hidden')
              }
            >
              <input
                ref={inputRef}
                className="flex-1 outline-none"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <FontAwesomeIcon
                className={'w-6 h-6 text-gray-700 cursor-pointer'}
                icon={searchText ? faTimes : faSearch}
                onClick={
                  searchText
                    ? () => setSearchText('')
                    : () => inputRef.current.focus()
                }
              />
              <div
                className={
                  (moreOneFilter ? 'bg-yellow-400' : 'bg-primary') +
                  ' hover:bg-toxic text-white flex items-center justify-center font-bold rounded-lg cursor-pointer w-7 h-7'
                }
                onClick={() => setMoreOneFilter(!moreOneFilter)}
              >
                {'>0'}
              </div>
            </div>
          )}
          {/* <div className="h-80">
          {/* <div className="h-20 overflow-x-hidden overflow-y-scroll"> */}
          {/* {filteredItemsArray} */}
          {/* </div> */}
          {/* <div className="overflow-y-scroll h-80"> */}
          {/* <div className="h-min"> */}
          {isMenuOpen && (
            <Virtuoso
              totalCount={filteredItemsArray.length}
              style={{
                maxHeight: 400,
                height: filteredItemsArray.length * itemHeight,
              }}
              // style={{ flex: 1 }}
              className={isMenuOpen ? '' : 'hidden'}
              // useWindowScroll
              data={filteredItemsArray}
              totalCount={filteredItemsArray.length}
              itemContent={(index, item) => (
                <Item
                  key={item._id}
                  item={item}
                  onClick={() => {
                    setIsMenuOpen(false)
                    onChange(item)
                  }}
                  active={item._id === selectedId}
                />
              )}
            />
          )}
          {/* </div> */}
          {/* </div> */}
        </div>
      )}
      {selectedItem ? (
        // <div className="w-full max-w-full">
        <Item item={selectedItem} />
      ) : (
        // </div>
        <div className="text-sm text-gray-800">Не выбрано</div>
      )}
    </div>
  )
}

export const SelectProduct = ({
  onChange,
  onDelete,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = null,
}) => {
  const { products } = useSelector((state) => state)
  return (
    <SelectItemContainer
      required={required}
      label="Товар"
      className={className}
      onClickClearButton={
        selectedId && clearButton
          ? onDelete
            ? () => onDelete()
            : () => onChange(null)
          : null
      }
    >
      <SelectItem
        items={products}
        itemComponent={ProductItem}
        onChange={onChange}
        selectedId={selectedId}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectSet = ({
  onChange,
  onDelete,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = null,
}) => {
  const { sets } = useSelector((state) => state)
  return (
    <SelectItemContainer
      required={required}
      label="Набор"
      className={className}
      onClickClearButton={
        selectedId && clearButton
          ? onDelete
            ? () => onDelete()
            : () => onChange(null)
          : null
      }
    >
      <SelectItem
        items={sets}
        itemComponent={SetItem}
        onChange={onChange}
        selectedId={selectedId}
        className={className}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectClient = ({
  onChange,
  onDelete,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = null,
}) => {
  const { clients } = useSelector((state) => state)
  return (
    <SelectItemContainer
      required={required}
      label="Клиент"
      className={className}
      onClickClearButton={
        selectedId && clearButton
          ? onDelete
            ? () => onDelete()
            : () => onChange(null)
          : null
      }
    >
      <SelectItem
        items={clients}
        itemComponent={PersonaItem}
        onChange={onChange}
        selectedId={selectedId}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectOrder = ({
  onChange,
  onDelete,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = null,
}) => {
  const { orders } = useSelector((state) => state)
  return (
    <SelectItemContainer
      required={required}
      label="Заказ"
      className={className}
      onClickClearButton={
        selectedId && clearButton
          ? onDelete
            ? () => onDelete()
            : () => onChange(null)
          : null
      }
    >
      <SelectItem
        items={orders}
        itemComponent={OrderItem}
        onChange={onChange}
        selectedId={selectedId}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectPayment = ({
  onChange,
  onDelete,
  onCreateNew,
  onEdit,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = null,
  label = null,
  onClick = null,
  dropDownList,
}) => {
  const { payments } = useSelector((state) => state)
  const payment = payments.find((payment) => payment._id === selectedId)

  return (
    <SelectItemContainer
      required={required}
      label={label}
      className={className}
      onClickClearButton={
        selectedId && clearButton
          ? onDelete
            ? () => onDelete(payment)
            : () => onChange(null)
          : null
      }
      onCreateNew={selectedId === '?' ? onCreateNew : null}
      onEdit={
        onEdit && selectedId !== '?' && payment ? () => onEdit(payment) : null
      }
    >
      <SelectItem
        items={payments}
        itemComponent={PaymentItem}
        onChange={onChange}
        selectedId={selectedId}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
        onClick={selectedId !== '?' && payment ? () => onClick(payment) : null}
        dropDownList={dropDownList}
      />
    </SelectItemContainer>
  )
}

const SelectItemContainer = ({
  required,
  label,
  className,
  onClickClearButton = null,
  onCreateNew,
  onEdit,
  children,
  inLine = false,
}) => {
  const Container = ({ children }) => {
    if (label)
      return (
        <div
          className={
            'flex' +
            (className ? ' ' + className : '') +
            (inLine ? ' items-center w-full' : ' flex-col')
          }
        >
          <label className={inLine ? 'w-18' : ''} htmlFor="client">
            {label}
            {required && <span className="text-red-700">*</span>}
          </label>
          <div className="flex flex-1 border border-gray-700 rounded-lg">
            {children}
          </div>
        </div>
      )

    return (
      <div className={'flex flex-col' + (className ? ' ' + className : '')}>
        <div className="flex">{children}</div>
      </div>
    )
  }

  return (
    <Container>
      {children}
      {onEdit && (
        <div className="flex items-center justify-center border-l border-gray-700">
          <button
            onClick={onEdit}
            className="flex items-center justify-center w-8 h-full rounded-r-lg shadow group whitespace-nowrap font-futuraDemi"
          >
            <FontAwesomeIcon
              className="w-3 h-3 duration-300 text-primary group-hover:scale-125"
              icon={faPencilAlt}
            />
          </button>
        </div>
      )}
      {onCreateNew && (
        <div className="flex items-center justify-center border-l border-gray-700">
          <button
            onClick={onCreateNew}
            className="flex items-center justify-center w-8 h-full rounded-r-lg shadow group whitespace-nowrap font-futuraDemi"
          >
            <FontAwesomeIcon
              className="w-3 h-3 duration-300 text-primary group-hover:scale-125"
              icon={faPlus}
            />
          </button>
        </div>
      )}
      {onClickClearButton && (
        <div className="flex items-center justify-center border-l border-gray-700">
          <button
            onClick={onClickClearButton}
            className="flex items-center justify-center w-8 h-full rounded-r-lg shadow group whitespace-nowrap font-futuraDemi"
          >
            <FontAwesomeIcon
              className="w-3 h-3 text-red-700 duration-300 group-hover:scale-125"
              icon={faTrash}
            />
          </button>
        </div>
      )}
    </Container>
  )
}

export const SelectDeliver = ({
  onChange,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = null,
}) => {
  const { users } = useSelector((state) => state)
  const delivers = users.filter((user) => user.role === 'deliver')
  return (
    <SelectItemContainer
      required={required}
      label="Курьер"
      className={className}
      onClickClearButton={
        selectedId && clearButton ? () => onChange(null) : null
      }
    >
      <SelectItem
        items={delivers}
        itemComponent={PersonaItem}
        onChange={onChange}
        selectedId={selectedId}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectDistrict = ({
  onChange,
  selectedId = null,
  exceptedIds = [],
  required = false,
  className = null,
  clearButton = true,
}) => {
  const { districts } = useSelector((state) => state)
  return (
    <SelectItemContainer
      required={required}
      label="Район"
      className={className ? ' ' + className : ''}
      onClickClearButton={
        selectedId && clearButton ? () => onChange(null) : null
      }
      inLine
    >
      <SelectItem
        items={districts}
        itemComponent={DistrictItem}
        onChange={onChange}
        selectedId={selectedId}
        className={
          'flex-1' +
          (selectedId && clearButton ? ' rounded-l-lg' : ' rounded-lg')
        }
        exceptedIds={exceptedIds}
        itemHeight={24}
        itemWidth="100%"
        noSearch
        sort="name"
      />
    </SelectItemContainer>
  )
}
