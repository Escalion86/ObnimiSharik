import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

const СomboList = ({ onChange, selectedId, products }) => (
  <select
    className="w-full px-2 py-1 text-sm bg-gray-200 rounded-l-lg"
    onChange={onChange}
    defaultValue={selectedId ? selectedId : '?'}
  >
    <option disabled className="text-sm" value="?">
      Выберите товар
    </option>
    {products.map((product, index) => (
      <option
        key={'combo' + product._id}
        className="text-sm"
        value={product._id}
      >
        {product.article ? '(' + product.article + ')' : '(без артикула)'}{' '}
        {product.name}
      </option>
    ))}
  </select>
)

const ItemRow = ({ onChange, selectedId, count = 1, index, products }) => {
  const onChangeCount = (e) =>
    onChange(selectedId, Number(e.target.value), index)
  const onChangeItem = (e) => onChange(e.target.value, count, index)

  return (
    <div className="flex border-b border-gray-700">
      <СomboList
        onChange={onChangeItem}
        selectedId={selectedId}
        products={products}
      />
      <input
        className="w-12 text-sm text-center bg-gray-200 border-l border-gray-700 rounded-r-lg"
        type="text"
        value={parseInt(count)}
        onChange={onChangeCount}
        onKeyPress={(e) => {
          e = e || window.event
          var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
          if (!(charCode >= 48 && charCode <= 57)) {
            e.preventDefault()
          }
        }}
      />
    </div>
  )
}

const ProductList = ({
  productsIdCount = {},
  products = {},
  onChange = () => {},
  required = false,
}) => {
  const onChangeItemRow = (id, count, index) => {
    const tempProductsIdCount = {}
    let i = 0
    for (const [id_old, count_old] of Object.entries(productsIdCount)) {
      if (i === index) tempProductsIdCount[id] = count
      else tempProductsIdCount[id_old] = count_old
      i++
    }
    onChange(tempProductsIdCount)
    // const newProductsIdCount = productsIdCount.map((item, index) => {
    //   if (index === e.index) return { id: e.id, count: e.count }
    //   return item
    // })
    // onChange(newProductsIdCount)
  }

  const AddRow = () => {
    onChange(Object.assign(productsIdCount, { ['?']: 1 }))
  }

  // const itemRows = () => {
  const itemRows = []
  // let i = 0
  for (const [id, count] of Object.entries(productsIdCount)) {
    itemRows.push(({ index }) => (
      <ItemRow
        onChange={onChangeItemRow}
        selectedId={id}
        count={count}
        index={index}
        products={products}
      />
    ))
    // i++
  }
  // }

  const addButtonIsActive = !('?' in productsIdCount)

  return (
    <div className="flex flex-col">
      <label htmlFor="productIds">
        Список товаров
        {required && <span className="text-red-700">*</span>}
      </label>
      <div
        name="productIds"
        className={
          'flex flex-col flex-wrap-reverse bg-gray-200 border rounded-lg ' +
          (required && !productsIdCount?.length
            ? 'border-red-700'
            : 'border-gray-700')
        }
      >
        {/* {productsIdCount &&
          productsIdCount.map((item, index) => (
            <ItemRow
              key={'ItemRow' + index}
              onChange={onChangeItemRow}
              selectedId={item.id}
              count={item.count}
              index={index}
              products={products}
            />
          ))} */}

        {itemRows.map((Item, index) => (
          <Item key={'ItemRow' + index} index={index} />
        ))}
        <div
          onClick={addButtonIsActive ? AddRow : null}
          className={
            'flex items-center justify-center h-6 bg-white rounded-lg' +
            (addButtonIsActive ? ' cursor-pointer' : '')
          }
        >
          <div
            className={
              'flex items-center justify-center flex-1 transparent' +
              (addButtonIsActive ? ' hover:scale-150' : '')
            }
          >
            <FontAwesomeIcon
              className={addButtonIsActive ? 'text-gray-700' : 'text-gray-400'}
              icon={faPlus}
              size="1x"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
