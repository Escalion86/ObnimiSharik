import React from 'react'
import { OrderCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'
import { DEFAULT_PRODUCT_CIRCULATION, ORDER_STATUSES } from '@helpers/constants'

const OrdersContent = ({ data, modals, loggedUser }) => {
  const role = loggedUser.role
  const orderStatusesAccessed =
    loggedUser.role === 'dev' || loggedUser.role === 'admin'
      ? ORDER_STATUSES
      : ORDER_STATUSES.filter((status) => status.roles.includes(role))
  const orderStatusesValues = orderStatusesAccessed.map(
    (status) => status.value
  )
  const roleFilteredOrders = data.filter(
    (order) =>
      orderStatusesValues.includes(order.status) &&
      (role !== 'deliver' ||
        (order.deliveryPickup === false && order.deliverId === loggedUser._id))
  )

  if (!(roleFilteredOrders && roleFilteredOrders.length > 0))
    return <div className="px-3">'Заказов нет'</div>

  const accessToContent = loggedUser.access.orders

  return (
    <Virtuoso
      data={roleFilteredOrders}
      itemContent={(index, order) => (
        <OrderCard
          key={order._id}
          order={order}
          loggedUser={loggedUser}
          onClick={() => modals.openOrderModal(order)}
          onEdit={
            accessToContent.edit(order)
              ? () => modals.openOrderModal(order, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(order)
              ? () => modals.openDeleteOrder(order)
              : null
          }
          onClone={
            accessToContent.add
              ? () => {
                  const orderClone = { ...order }
                  delete orderClone._id
                  modals.openOrderModal(orderClone)
                }
              : null
          }
          onProductEditClick={(product) =>
            loggedUser.access.products.edit(product)
              ? () => modals.openProductModal(product, null, null, true)
              : null
          }
          onProductFilterClick={(product) => {
            dispatch(
              setFilter({
                sets: {
                  ...filter.sets,
                  products: [product._id],
                },
              })
            )
            toasts.info(
              <div>
                <div>Применен фильтр по товару в наборе</div>
                <div className="italic">"{product.name}"</div>
              </div>
            )
          }}
          onProductBuyClick={
            loggedUser.access.productCirculations.add
              ? (product) =>
                  modals.openProductCirculationModal({
                    ...DEFAULT_PRODUCT_CIRCULATION,
                    productId: product._id,
                  })
              : null
          }
          onSetEditClick={(set) =>
            loggedUser.access.sets.edit(set)
              ? () => modals.openSetModal(set, null, null, true)
              : null
          }
          onSetFilterClick={(set) => {
            dispatch(
              setFilter({
                orders: {
                  ...filter.orders,
                  sets: [set._id],
                },
              })
            )
            toasts.info(
              <div>
                <div>Применен фильтр по набору в заказах</div>
                <div className="italic">"{set.name}"</div>
              </div>
            )
          }}
        />
      )}
    />
  )
}

export default OrdersContent
