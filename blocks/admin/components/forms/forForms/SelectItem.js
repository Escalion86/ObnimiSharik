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
      'flex items-center justify-between flex-1 p-1 border-b border-gray-700 cursor-pointer h-14 min-w-76 last:border-0' +
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
    <div className="flex-1 overflow-hidden">
      <div className="text-gray-800 whitespace-nowrap">{item.name}</div>
      <div className="text-sm text-gray-600">
        Артикул: {item.article || '[нет]'}
      </div>
    </div>
    <div className="flex flex-col items-end min-w-12">
      <div className="text-gray-800">{item.price / 100} ₽</div>
      <div className="text-sm text-gray-600">{item.count} шт</div>
    </div>
  </div>
  // </Tooltip>
)

const SelectItem = ({
  items,
  onChange,
  selectedItem = null,
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const ref = useRef()
  const inputRef = useRef()

  const filteredItems = items.filter((item) => {
    const searchTextLowerCase = searchText.toLowerCase()
    const itemNameLowerCase = item.name.toLowerCase()
    return (
      itemNameLowerCase.includes(searchTextLowerCase) ||
      item.article.includes(searchTextLowerCase)
    )
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

  return (
    <div
      className={
        'relative flex items-center justify-end p-1 bg-gray-200 border border-gray-700 cursor-pointer h-14' +
        (className ? ' ' + className : '')
      }
      onClick={() => {
        toggleIsMenuOpen()
      }}
      ref={ref}
    >
      <div
        className={
          'absolute overflow-hidden max-h-80 transform duration-300 flex flex-col top-full left-0 right-0 bg-white shadow-sm border border-gray-700 ' +
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
              active={item._id === selectedItem?._id}
            />
          ))}
        </div>
      </div>
      {selectedItem && <Item item={selectedItem} />}
    </div>
  )
}

export const SelectProduct = ({
  onChange,
  selectedProduct = null,
  className = '',
}) => {
  const { products } = useSelector((state) => state)
  return (
    <SelectItem
      items={products}
      onChange={onChange}
      selectedItem={selectedProduct}
      className={className}
    />
  )
}

export const SelectSet = ({ onChange, selectedSet = null, className = '' }) => {
  const { sets } = useSelector((state) => state)
  return (
    <SelectItem
      items={sets}
      onChange={onChange}
      selectedItem={selectedSet}
      className={className}
    />
  )
}
