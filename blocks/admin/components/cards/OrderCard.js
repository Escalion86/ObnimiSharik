import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import formatDateTime from '@helpers/formatDateTime'
// import { useSelector } from 'react-redux'
import ProductsInCard from './forCards/ProductsInCard'
import SetsInCard from './forCards/SetsInCard'
import { ORDER_STATUSES } from '@helpers/constants'
import formatDeliveryAddress from '@helpers/formatDeliveryAddress'

export const OrderCard = ({
  order,
  onClick = () => {},
  onClone = () => {},
  onProductClick = () => {},
  onSetClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  // const { clients, products, sets } = useSelector((state) => state)
  const productsIdCount = {}
  order.productsCount.forEach(
    (productCount) =>
      (productsIdCount[productCount.product._id] = productCount.count)
  )
  const setsIdCount = {}
  order.setsCount.forEach(
    (setCount) => (setsIdCount[setCount.set._id] = setCount.count)
  )

  const orderStatus = ORDER_STATUSES.find(
    (orderStatus) => orderStatus.value === order.status
  )

  return (
    <Card onClick={() => onClick(order)}>
      <CardContainer className="flex-col">
        <div className="flex flex-1 gap-x-2">
          <div>{formatDateTime(order.deliveryDateFrom)}</div>
          <div className="flex flex-col flex-wrap justify-between flex-1 gap-x-4 phoneH:flex-row">
            <div className="font-semibold">№ {order.number}</div>
          </div>
        </div>
        <div>
          <ProductsInCard
            label="Товары"
            productsIdCount={productsIdCount}
            // productsWithCount={productsWithCount}
            onClick={onProductClick}
          />
          <SetsInCard
            label="Наборы"
            setsIdCount={setsIdCount}
            // productsWithCount={productsWithCount}
            onClick={onSetClick}
          />
          <div className="text-sm tablet:whitespace-nowrap">
            Адрес: {formatDeliveryAddress(order.deliveryAddress)}
          </div>
        </div>
        {/* <div className="text-right"> */}
        {/* <div className="font-bold">{roleRus(user.role)}</div> */}
        {/* <div className="italic">{'123'}</div> */}
        {/* </div> */}
      </CardContainer>
      <div className="flex flex-col items-end justify-between">
        <CardButtons
          onEdit={onEdit}
          onDelete={onDelete}
          onClone={onClone}
          topRight
        />
        <div className="px-1 font-bold text-right whitespace-nowrap min-w-min">
          {order.price / 100} ₽
        </div>
        <div
          className={
            'flex items-center bg-white justify-center w-28 h-12 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg ' +
            orderStatus.color
          }
        >
          <span className="text-sm text-center">{orderStatus.name}</span>
        </div>
      </div>
    </Card>
  )
}

export default OrderCard
