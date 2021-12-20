import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import {
  ProductItem,
  PersonaItem,
} from './forms/forForms/SelectItemsList/ItemCards'

const SearchBox = ({ modals }) => {
  // const inputRef = useRef()
  const [inputText, setInputText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [openList, setOpenList] = useState(false)

  const eraseSearchTextAndClose = () => {
    setOpenList(false)
    setInputText('')
    setTimeout(() => setSearchText(''), 400)
  }

  const { products, sets, clients } = useSelector((state) => state)

  const searchTextLowerCase = searchText.toLowerCase()

  const filter = (item) =>
    item.name?.toString().toLowerCase().includes(searchTextLowerCase) ||
    item.number?.toString().includes(searchTextLowerCase) ||
    item.article?.toString().toLowerCase().includes(searchTextLowerCase) ||
    item.phone?.toString().includes(searchTextLowerCase) ||
    item.whatsapp?.toString().includes(searchTextLowerCase) ||
    item.price?.toString().includes(searchTextLowerCase)
  // ||
  // item.fullPrice?.toString().includes(searchTextLowerCase)
  const filteredProducts = products.filter((product) => filter(product))
  const filteredSets = sets.filter((set) => filter(set))
  const filteredClients = clients.filter((client) => filter(client))

  const SearchedProducts = () => {
    if (filteredProducts.length === 0) return null

    return (
      <>
        <div className="sticky top-0 font-bold bg-gray-200 border-b border-gray-700">
          Продукты
        </div>
        {filteredProducts.map((product) => (
          <ProductItem
            key={'product' + product._id}
            item={product}
            onClick={() => {
              eraseSearchTextAndClose()
              modals.products.open(product)
            }}
          />
        ))}
      </>
    )
  }

  const SearchedSets = () => {
    if (filteredSets.length === 0) return null

    return (
      <>
        <div className="sticky top-0 font-bold bg-gray-200 border-b border-gray-700">
          Наборы
        </div>
        {filteredSets.map((set) => (
          <ProductItem
            key={'set' + set._id}
            item={set}
            onClick={() => {
              eraseSearchTextAndClose()
              modals.sets.open(set)
            }}
          />
        ))}
      </>
    )
  }

  const SearchedClients = () => {
    if (filteredClients.length === 0) return null

    return (
      <>
        <div className="sticky top-0 font-bold bg-gray-200 border-b border-gray-700">
          Клиенты
        </div>
        {filteredClients.map((client) => (
          <PersonaItem
            key={'client' + client._id}
            item={client}
            onClick={() => {
              eraseSearchTextAndClose()
              modals.clients.open(client)
            }}
          />
        ))}
      </>
    )
  }

  return (
    <div className="relative flex items-center flex-1 gap-1 p-1 bg-white border border-gray-700 rounded-lg max-w-100">
      <input
        // ref={inputRef}
        className="flex-1 outline-none"
        type="text"
        value={inputText}
        onChange={(e) => {
          setOpenList(e.target.value !== '')
          setInputText(e.target.value)
          if (e.target.value !== '' && searchText !== e.target.value)
            setSearchText(e.target.value)
        }}
      />
      <FontAwesomeIcon
        className={
          'w-5 h-5 text-gray-400 ' + (inputText ? ' cursor-pointer' : '')
        }
        icon={inputText ? faTimes : faSearch}
        onClick={inputText ? () => eraseSearchTextAndClose() : null}
      />
      <div
        className={
          'absolute overflow-hidden max-h-64 transform duration-300 ease-out flex flex-col top-full left-0 right-0 bg-white shadow-sm border border-gray-700 z-50 ' +
          (openList ? 'scale-100' : 'scale-y-0 -translate-y-1/2 opacity-0')
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-x-hidden overflow-y-auto">
          <SearchedProducts />
          <SearchedSets />
          <SearchedClients />
          {filteredClients.length === 0 &&
          filteredProducts.length === 0 &&
          filteredSets.length === 0 ? (
            <div className="sticky top-0 text-sm bg-gray-200">
              Ничего не найдено
            </div>
          ) : null}
          {/* {filteredItems.map((item) => (
            <Item
              key={item._id}
              item={item}
              onClick={() => {
                setIsMenuOpen(false)
                onChange(item)
              }}
              active={item._id === selectedId}
            />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default SearchBox
