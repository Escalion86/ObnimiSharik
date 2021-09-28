import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import formatDateTime from '@helpers/formatDateTime'

export const OrderCard = ({
  order,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  return (
    <Card inLine onClick={() => onClick(order)}>
      <CardContainer>
        <div className="flex items-center flex-1 gap-x-2">
          <div>{formatDateTime(order.deliveryDateFrom, true)}</div>
          <div className="flex flex-col flex-wrap justify-between flex-1 gap-x-4 phoneH:flex-row">
            <div className="font-semibold">№ {order.number}</div>
          </div>
          <div className="font-bold whitespace-nowrap">
            {order.fullPrice / 100} ₽
          </div>
        </div>
        {/* <div className="text-right"> */}
        {/* <div className="font-bold">{roleRus(user.role)}</div> */}
        {/* <div className="italic">{'123'}</div> */}
        {/* </div> */}
      </CardContainer>
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default OrderCard
