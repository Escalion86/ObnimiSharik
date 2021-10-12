import formatDateTime from '@helpers/formatDateTime'
import { useSelector } from 'react-redux'

const ItemContainer = ({ onClick, active, children }) => (
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
    {children}
  </div>
)

export const ProductItem = ({ item, onClick = null, active = false }) => (
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
  <ItemContainer onClick={onClick} active={active}>
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
  </ItemContainer>
  // </Tooltip>
)

export const SetItem = (props) => ProductItem(props)

export const PersonaItem = ({ item, onClick = null, active = false }) => (
  <ItemContainer onClick={onClick} active={active}>
    <div className="h-5 text-sm text-gray-800 truncate">{item.name}</div>
    <div className="flex items-center overflow-x-hidden text-xs text-gray-600 gap-x-2">
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
  </ItemContainer>
  // </Tooltip>
)

export const OrderItem = ({ item, onClick = null, active = false }) => (
  <ItemContainer onClick={onClick} active={active}>
    <div className="h-5 text-sm text-gray-800 truncate">№ {item.number}</div>
    <div className="flex items-center text-xs text-gray-600 gap-x-2">
      {/* <div className="flex-2 whitespace-nowrap">
        Артикул: {item.а || '[нет]'}
      </div> */}
      <div className="flex-1 whitespace-nowrap">
        {formatDateTime(item.deliveryDateFrom, false)}
      </div>
      <div className="flex-1 text-right whitespace-nowrap">
        {item.price / 100} ₽
      </div>
    </div>
  </ItemContainer>
)

export const PaymentItem = ({ item, onClick = null, active = false }) => {
  const { orders, clients } = useSelector((state) => state)
  const order = item.orderId
    ? orders.find((order) => order._id === item.orderId)
    : null
  const client = item.clientId
    ? clients.find((client) => client._id === item.clientId)
    : null
  return (
    <ItemContainer onClick={onClick} active={active}>
      <div className="flex justify-between h-5 text-sm text-gray-800 truncate">
        <div>№ {item.number}</div>
        {order && <div>Заказ №{order.number}</div>}
        {client && <div>Клиент: {client.name}</div>}
      </div>
      <div className="flex items-center text-xs text-gray-600 gap-x-2">
        <div className="flex-1 whitespace-nowrap">
          {formatDateTime(item.payAt, false)}
        </div>
        <div className="flex-1 text-right whitespace-nowrap">{item.way}</div>
        <div className="flex-1 text-right whitespace-nowrap">
          {item.sum / 100} ₽
        </div>
      </div>
    </ItemContainer>
  )
}
