import React from 'react'
import { OrderCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const OrdersContent = ({ data, modals }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Заказов нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, order) => (
        <OrderCard
          key={order._id}
          order={order}
          onClick={() => modals.openOrderModal(order)}
          onEdit={() => modals.openOrderModal(order, true)}
          onDelete={() => modals.openDeleteOrder(order)}
        />
      )}
    />
  )
}

export default OrdersContent