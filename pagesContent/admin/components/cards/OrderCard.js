import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import formatDateTime from '@helpers/formatDateTime'
// import { useSelector } from 'react-redux'
import ProductsInCard from './forCards/ProductsInCard'
import SetsInCard from './forCards/SetsInCard'
import { ORDER_STATUSES } from '@helpers/constants'
import formatDeliveryAddress from '@helpers/formatDeliveryAddress'
import { useSelector } from 'react-redux'

export const OrderCard = ({
  order,
  onClick = () => {},
  onClone = () => {},
  onProductEditClick = null,
  onProductFilterClick = null,
  onProductBuyClick = null,
  onSetEditClick = null,
  onSetFilterClick = null,
  onSetClick = () => {},
  onEdit = null,
  onDelete = null,
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
}) => {
  const { payments } = useSelector((state) => state)
  const productsIdCount = {}
  order.productsCount.forEach((productCount) => {
    if (productCount.product?._id)
      productsIdCount[productCount.product._id] = productCount.count
  })
  const setsIdCount = {}
  order.setsCount.forEach((setCount) => {
    if (setCount.set?._id) setsIdCount[setCount.set._id] = setCount.count
  })

  const orderStatus = ORDER_STATUSES.find(
    (orderStatus) => orderStatus.value === order.status
  )

  const orderPayments = payments
    .filter((payment) => payment.orderId === order._id)
    .map((payment) => payment._id)

  const totalPaymentsSum = payments.reduce((prev, current) => {
    if (orderPayments.includes(current._id)) return prev + current.sum
    return prev
  }, 0)

  const totalPrice = order.price - order.discount

  return (
    <Card
      onClick={() => onClick(order)}
      onCheckClick={onCheckClick}
      multiselectMode={multiselectMode}
      checked={checked}
    >
      <CardContainer className="flex-col">
        <div className="flex flex-1 gap-x-2">
          <div>{formatDateTime(order.deliveryDateFrom)}</div>
          <div className="flex flex-col flex-wrap justify-between flex-1 gap-x-4 phoneH:flex-row">
            <div className="font-semibold">??? {order.number}</div>
          </div>
        </div>
        <div>
          <ProductsInCard
            label="????????????"
            productsIdCount={productsIdCount}
            onEdit={onProductEditClick}
            onFilter={onProductFilterClick}
            onBuy={onProductBuyClick}
          />
          <SetsInCard
            label="????????????"
            setsIdCount={setsIdCount}
            onEdit={onSetEditClick}
            onFilter={onSetFilterClick}
          />
          <div className="text-sm tablet:whitespace-nowrap">
            ??????????: {formatDeliveryAddress(order.deliveryAddress)}
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
          {(totalPaymentsSum && totalPaymentsSum >= order.price
            ? '?????????????? '
            : '?????????? ' + totalPaymentsSum / 100 + ' / ') +
            totalPrice / 100 +
            (totalPaymentsSum && totalPaymentsSum > order.price
              ? ' + ???????????? ' + (totalPaymentsSum - totalPrice) / 100
              : '') +
            ' ???'}
        </div>
        <div
          className={
            'flex items-center bg-white justify-center w-28 h-12 border-t border-l border-gray-200 rounded-tl-lg rounded-br-lg ' +
            `bg-${orderStatus.color}`
          }
        >
          <span className="text-sm text-center">{orderStatus.name}</span>
        </div>
      </div>
    </Card>
  )
}

export default OrderCard
