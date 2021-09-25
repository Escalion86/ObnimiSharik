import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

const Item = ({ item, onClick = null, active = false }) => (
  // <Tooltip
  //   title={
  //     <div className="text-xs">
  //       {product?.name}
  //       <br />
  //       Артикул:{' '}
  //       {product?.article ? '(' + product.article + ')' : 'отсутствует'}
  //       <br />В наличии: {product?.count ? product.count : '0'} шт.
  //     </div>
  //   }
  //   arrow
  //   placement="top"
  //   // enterDelay={1000}
  //   // leaveDelay={0}
  // >
  <div
    className={
      'w-full  max-w-full py-0.5 px-1 border-b border-gray-700 cursor-pointer h-10 last:border-0' +
      (onClick ? ' hover:bg-blue-200' : '') +
      (active ? ' bg-green-200' : '')
    }
    onClick={
      onClick
        ? (e) => {
            e.stopPropagation()
            onClick()
          }
        : null
    }
  >
    <div className="h-5 text-sm text-gray-800 truncate">{item.name}</div>
    <div className="flex items-center text-xs text-gray-600 gap-x-2">
      <div className="flex-2 whitespace-nowrap">
        Артикул: {item.article || '[нет]'}
      </div>
      <div className="flex-1 text-center whitespace-nowrap">
        {item.count} шт
      </div>
      <div className="flex-1 text-right whitespace-nowrap">
        {item.price / 100} ₽
      </div>
    </div>
  </div>
  // </Tooltip>
)

const ClientItem = ({ item, onClick = null, active = false }) => (
  <div
    className={
      'w-full  max-w-full py-0.5 px-1 border-b border-gray-700 cursor-pointer h-10 last:border-0' +
      (onClick ? ' hover:bg-blue-200' : '') +
      (active ? ' bg-green-200' : '')
    }
    onClick={
      onClick
        ? (e) => {
            e.stopPropagation()
            onClick()
          }
        : null
    }
  >
    <div className="h-5 text-sm text-gray-800 truncate">{item.name}</div>
    <div className="flex items-center text-xs text-gray-600 gap-x-2">
      <div className="flex-1 whitespace-nowrap">
        Телефон: +{item.phone || '[нет]'}
      </div>
      {item.whatsapp && (
        <div className="flex-1 text-center whitespace-nowrap">
          WhatsApp: +{item.whatsapp}
        </div>
      )}
      {item.email && (
        <div className="flex-1 text-right whitespace-nowrap">
          Email: {item.email || '[нет]'}
        </div>
      )}
    </div>
  </div>
  // </Tooltip>
)

export const SelectItem = ({
  items,
  itemComponent = Item,
  onChange,
  selectedId = null,
  exceptedIds = [],
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const ref = useRef()
  const inputRef = useRef()

  const selectedItem = selectedId
    ? items.find((item) => item._id === selectedId)
    : null

  const filteredItems = (
    searchText || exceptedIds.length > 0
      ? items.filter((item) => {
          const searchTextLowerCase = searchText.toLowerCase()
          const itemNameLowerCase = item.name.toLowerCase()
          return (
            !exceptedIds.includes(item._id) &&
            (itemNameLowerCase.includes(searchTextLowerCase) ||
              item.article?.includes(searchTextLowerCase) ||
              item.phone?.toString().includes(searchTextLowerCase) ||
              item.whatsapp?.toString().includes(searchTextLowerCase))
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

  const toggleIsMenuOpen = () => setIsMenuOpen((state) => !state)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    if (isMenuOpen) inputRef.current.focus()

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isMenuOpen])

  const Item = itemComponent

  return (
    <div
      className={
        'relative bg-gray-200 cursor-pointer h-10 w-0 flex justify-center items-center' +
        (className ? ' ' + className : '')
      }
      onClick={() => {
        toggleIsMenuOpen()
      }}
      ref={ref}
    >
      <div
        className={
          'absolute overflow-hidden max-h-64 transform duration-300 ease-out flex flex-col top-full left-0 right-0 bg-white shadow-sm border border-gray-700 z-50 ' +
          (isMenuOpen ? 'scale-100' : 'scale-y-0 -translate-y-1/2 opacity-0')
        }
        onClick={(e) => e.stopPropagation()}
      >
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
        </div>
        <div className="overflow-x-hidden overflow-y-scroll">
          {filteredItems.map((item) => (
            <Item
              key={item._id}
              item={item}
              onClick={() => {
                setIsMenuOpen(false)
                onChange(item)
              }}
              active={item._id === selectedId}
            />
          ))}
        </div>
      </div>
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
  selectedId = null,
  exceptedIds = [],
  required = false,
}) => {
  const { products } = useSelector((state) => state)
  return (
    <SelectItemContainer required={required} label="Товар">
      <SelectItem
        items={products}
        onChange={onChange}
        selectedId={selectedId}
        className={'flex-1 rounded-lg'}
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectSet = ({
  onChange,
  selectedId = null,
  exceptedIds = [],
  required = false,
}) => {
  const { sets } = useSelector((state) => state)
  return (
    <SelectItemContainer required={required} label="Набор">
      <SelectItem
        items={sets}
        onChange={onChange}
        selectedId={selectedId}
        className={className}
        className={'flex-1 rounded-lg'}
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

export const SelectClient = ({
  onChange,
  selectedId = null,
  exceptedIds = [],
  required = false,
}) => {
  const { clients } = useSelector((state) => state)
  return (
    <SelectItemContainer required={required} label="Клиент">
      <SelectItem
        items={clients}
        itemComponent={ClientItem}
        onChange={onChange}
        selectedId={selectedId}
        className={'flex-1 rounded-lg'}
        exceptedIds={exceptedIds}
      />
    </SelectItemContainer>
  )
}

const SelectItemContainer = ({ required, label, children }) => (
  <div className="flex flex-col">
    <label htmlFor="client">
      {label}
      {required && <span className="text-red-700">*</span>}
    </label>
    <div className="flex border border-gray-700 rounded-lg">{children}</div>
  </div>
)
