import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { SelectItem, SelectPayment, SelectProduct } from './SelectItem'
import { useSelector } from 'react-redux'
import { PaymentItem, ProductItem } from './ItemCards'
import cn from 'classnames'

// const СomboList = ({ onChange, selectedId, products }) => (
//   <select
//     className="w-full px-2 py-1 text-sm bg-gray-200 cursor-pointer"
//     onChange={onChange}
//     defaultValue={selectedId ? selectedId : '?'}
//   >
//     <option disabled className="text-sm" value="?">
//       Выберите товар
//     </option>
//     {products.map((product, index) => (
//       <option
//         key={'combo' + product._id}
//         className="text-sm"
//         value={product._id}
//       >
//         {product.article ? '(' + product.article + ')' : '(без артикула)'}{' '}
//         {product.name}
//       </option>
//     ))}
//   </select>
// )

const ItemRow = ({
  items,
  onChange,
  onDelete,
  onCreateNew,
  onEdit,
  onClick,
  selectedId,
  index,
  selectedItemsIds,
  SelectItemComponent = SelectItem,
  dropDownList,
}) => {
  const onChangeItem = (value) => onChange(value, index)

  return (
    <div className="flex border-b border-gray-700">
      <SelectItemComponent
        items={items}
        className={cn('flex-1', { 'rounded-tl-lg': index === 0 })}
        onChange={(item) => onChangeItem(item._id)}
        selectedId={selectedId}
        exceptedIds={selectedItemsIds}
        clearButton={dropDownList && onDelete}
        onDelete={onDelete ? (item) => onDelete(index, item) : null}
        onCreateNew={onCreateNew ? () => onCreateNew(index) : null}
        onEdit={onEdit ? (item) => onEdit(index, item) : null}
        onClick={onClick ? (item) => onClick(index, item) : null}
        dropDownList={dropDownList}
      />
      {/* {count !== undefined && (
        <div className="flex items-center justify-between border-l border-gray-700">
          <div
            className={
              'flex items-center justify-center h-full px-1 group cursor-pointer'
              // (count > 0 ? 'cursor-pointer' : 'cursor-not-allowed')
            }
            onClick={count > 1 ? decCount : () => onDelete(index)}
          >
            <FontAwesomeIcon
              className={
                count > 1
                  ? 'text-gray-700 transform group-hover:hover:scale-125 duration-200 '
                  : // : 'text-gray-400'
                    'text-red-700'
              }
              icon={count > 1 ? faMinus : faTrash}
              size="sm"
            />
          </div>
          <input
            className="w-10 text-sm text-center bg-gray-200 border-l border-r border-gray-700 outline-none"
            type="text"
            value={parseInt(count)}
            onChange={onChangeCount}
            onKeyPress={(e) => {
              e = e || window.event
              var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
              if (!(charCode >= 48 && charCode <= 57)) {
                e?.preventDefault()
              }
            }}
          />
          <div
            className="flex items-center justify-center h-full px-1 cursor-pointer group"
            onClick={incCount}
          >
            <FontAwesomeIcon
              className="text-gray-700 duration-200 transform group-hover:hover:scale-125"
              icon={faPlus}
              size="sm"
            />
          </div>
        </div>
      )} */}
    </div>
  )
}

export const SelectItemList = ({
  items = [],
  itemsId = [],
  ItemComponent = ProductItem,
  SelectItemComponent = SelectProduct,
  title = '',
  onChange = () => {},
  onCreateNew = null,
  onEdit = null,
  onDelete = null,
  onClick = null,
  required = false,
  readOnly = false,
  dropDownList = true,
}) => {
  if (!itemsId) itemsId = []
  if (readOnly && itemsId.length === 0) return null

  const itemRows = []

  if (readOnly) {
    const ItemRows = ({ itemsId, items }) => {
      const itemRows = []
      itemsId.forEach((itemId) => {
        if (itemId !== '?')
          itemRows.push(items.find((item) => item._id === itemId))
      })

      return itemRows.map((item, index) => (
        <div
          key={'ItemComponent' + index}
          className="border-gray-700 border-b-1 last:border-0"
        >
          <ItemComponent item={item} readOnly />
        </div>
      ))
    }

    return (
      <div className="flex flex-col">
        {title && (
          <label
            htmlFor="itemsIds"
            className="border-b-1 border-primary max-w-min whitespace-nowrap"
          >
            {title}:
          </label>
        )}
        <div className="mt-1 overflow-hidden bg-gray-200 border-gray-700 rounded-lg border-1">
          <ItemRows items={items} itemsId={itemsId} />
        </div>
      </div>
    )
  }

  itemsId.forEach((itemId) =>
    itemRows.push(({ index }) => (
      <ItemRow
        items={items}
        onChange={onChangeItemRow}
        onDelete={(index, payment) => {
          if (onDelete) onDelete(payment, () => deleteRow(index))
          else deleteRow(index)
        }}
        onCreateNew={onCreateNew}
        onEdit={onEdit}
        onClick={onClick}
        selectedId={itemId}
        index={index}
        selectedItemsIds={itemsId}
        SelectItemComponent={SelectItemComponent}
        dropDownList={dropDownList}
      />
    ))
  )

  const onChangeItemRow = (id, index) => {
    const tempItemsId = [...itemsId]
    tempItemsId[index] = id
    onChange(tempItemsId)
  }

  const addRow = () => {
    const tempItemsId = [...itemsId]
    tempItemsId.push('?')
    onChange(tempItemsId)
  }

  const deleteRow = (index) => {
    const tempItemsId = [...itemsId]
    tempItemsId.splice(index, 1)
    onChange(tempItemsId)
  }

  const addButtonIsActive = !itemsId.includes('?')

  return (
    <div className="flex flex-col">
      <label htmlFor="itemsIds">
        {title}
        {required && <span className="text-red-700">*</span>}
      </label>
      <div
        name="itemsIds"
        className={cn(
          'flex flex-col flex-wrap-reverse bg-gray-200 border rounded-lg',
          required &&
            required !== 'star' &&
            (itemsId.length === 0 || itemsId[0] === '?')
            ? 'border-red-700'
            : 'border-gray-700'
        )}
      >
        {itemRows.map((Item, index) => (
          <Item key={'ItemRow' + index} index={index} />
        ))}
        <div
          onClick={
            addButtonIsActive ? (dropDownList ? addRow : onCreateNew) : null
          }
          className={cn(
            'group flex items-center justify-center h-6 bg-white rounded-lg',
            { 'cursor-pointer': addButtonIsActive }
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center flex-1 transparent',
              { 'duration-200 group-hover:scale-125': addButtonIsActive }
            )}
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

export const SelectProductList = ({
  productsId = null,
  onChange = () => {},
  required = false,
  readOnly = false,
  title = 'Список товаров',
  callbackArray = false,
}) => {
  const { products } = useSelector((state) => state)
  return (
    <SelectItemList
      items={products}
      itemsId={productsId}
      title={title}
      onChange={(itemsIdCount) => {
        if (callbackArray) {
          const tempItemsIdCount = []
          for (const [id, count] of Object.entries(itemsIdCount)) {
            tempItemsIdCount.push({
              product:
                id === '?'
                  ? null
                  : products.find((product) => product._id === id),
              count,
            })
          }
          onChange(tempItemsIdCount)
        } else onChange(itemsIdCount)
      }}
      required={required}
      readOnly={readOnly}
    />
  )
}

export const SelectSetList = ({
  setsIdCount = null,
  onChange = () => {},
  required = false,
  readOnly = false,
  title = 'Список наборов',
  callbackArray = false,
}) => {
  const { products, sets } = useSelector((state) => state)
  return (
    <SelectItemList
      items={sets}
      subItems={products}
      subItemsIdCountKey="productsIdCount"
      itemsIdCount={setsIdCount}
      title={title}
      onChange={(itemsIdCount) => {
        if (callbackArray) {
          const tempItemsIdCount = []
          for (const [id, count] of Object.entries(itemsIdCount)) {
            tempItemsIdCount.push({
              set: id === '?' ? null : sets.find((set) => set._id === id),
              count,
            })
          }
          onChange(tempItemsIdCount)
        } else onChange(itemsIdCount)
      }}
      required={required}
      readOnly={readOnly}
    />
  )
}

export const SelectPaymentList = ({
  paymentsId = null,
  onChange = () => {},
  onCreateNew = null,
  onEdit = null,
  onDelete = null,
  onClick = null,
  required = false,
  readOnly = false,
  title = 'Транзакции',
  callbackArray = false,
  dropDownList = true,
}) => {
  const { payments } = useSelector((state) => state)
  return (
    <SelectItemList
      items={payments}
      itemsId={paymentsId}
      ItemComponent={PaymentItem}
      SelectItemComponent={SelectPayment}
      onCreateNew={onCreateNew}
      onEdit={onEdit}
      onDelete={onDelete}
      onClick={onClick}
      title={title}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      dropDownList={dropDownList}
    />
  )
}
