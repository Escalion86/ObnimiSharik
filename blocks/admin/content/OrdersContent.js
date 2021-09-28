import React from 'react'
import { OrderCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'
import { ORDER_STATUSES } from '@helpers/constants'

const OrdersContent = ({ data, modals, user }) => {
  const role = user.role
  const orderStatusesAccessed =
    user.role === 'dev' || user.role === 'admin'
      ? ORDER_STATUSES
      : ORDER_STATUSES.filter((status) => status.roles.includes(role))
  const orderStatusesValues = orderStatusesAccessed.map(
    (status) => status.value
  )
  const roleFilteredOrders = data.filter(
    (order) =>
      orderStatusesValues.includes(order.status) &&
      (role !== 'deliver' ||
        (order.deliveryPickup === false && order.deliverId === user._id))
  )

  if (!(roleFilteredOrders && roleFilteredOrders.length > 0))
    return <div className="px-3">'Заказов нет'</div>

  return (
    <Virtuoso
      data={roleFilteredOrders}
      itemContent={(index, order) => (
        <OrderCard
          key={order._id}
          order={order}
          role={user.role}
          onClick={() => modals.openOrderModal(order)}
          onEdit={() => modals.openOrderModal(order, true)}
          onDelete={() => modals.openDeleteOrder(order)}
        />
      )}
    />
  )
}

export default OrdersContent
