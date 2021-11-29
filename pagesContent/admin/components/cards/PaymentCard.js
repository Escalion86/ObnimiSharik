import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import formatDateTime from '@helpers/formatDateTime'
import { useSelector } from 'react-redux'
import { PAY_TYPES } from '@helpers/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

export const PaymentCard = ({
  payment,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  const { orders } = useSelector((state) => state)
  const order = orders.find((order) => order._id === payment.orderId)
  const payType = PAY_TYPES.find(
    (payTypeItem) => payTypeItem.value === payment.payType
  )
  return (
    <Card onClick={() => onClick(payment)}>
      <div
        className={
          'flex justify-center items-center w-9 rounded-l-lg text-white bg-' +
          (payType ? payType.color : 'gray-400')
        }
      >
        <FontAwesomeIcon icon={payType?.icon ?? faQuestion} size="lg" />
      </div>
      <CardContainer className="justify-between">
        {/* <div className="items-center flex-1">
          <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
            <div>
              <span className="font-semibold">№ {payment.number}</span> от{' '}
              <span className="font-semibold">
                {formatDateTime(payment.payAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 italic">
          Заказ № {order.number} на {formatDateTime(order.deliveryDateFrom)}
        </div> */}

        <div className="items-center flex-1">
          <div className="flex flex-col gap-y-1">
            <div className="whitespace-nowrap">
              <span className="font-semibold">№ {payment.number}</span> от{' '}
              <span className="font-semibold">
                {formatDateTime(payment.payAt)}
              </span>
            </div>
            {order ? (
              <div className="flex-1 italic">
                Заказ № {order.number} на{' '}
                {formatDateTime(order.deliveryDateFrom)}
              </div>
            ) : (
              <div className="flex-1 italic text-red-600">Заказ не найден</div>
            )}
          </div>
        </div>
      </CardContainer>
      {/* <div className="text-right">
        <div className="font-bold">{payment.sum} ₽</div>
      </div> */}
      <div className="flex flex-col-reverse items-end justify-between laptop:flex-row laptop:items-center">
        <div className="px-1 font-bold">{payment.sum / 100} ₽</div>
        <CardButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </Card>
  )
}

export default PaymentCard
