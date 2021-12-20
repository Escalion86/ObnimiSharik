import { OrderCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION, ORDER_STATUSES } from '@helpers/constants'
import Content from './Content'

const OrdersContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const orderStatusesAccessed =
    loggedUser.role === 'dev' || loggedUser.role === 'admin'
      ? ORDER_STATUSES
      : ORDER_STATUSES.filter((status) =>
          status.roles.includes(loggedUser.role)
        )
  const orderStatusesValues = orderStatusesAccessed.map(
    (status) => status.value
  )
  const roleFilteredOrders = data.filter(
    (order) =>
      orderStatusesValues.includes(order.status) &&
      (loggedUser.role !== 'deliver' ||
        (order.deliveryPickup === false && order.deliverId === loggedUser._id))
  )

  const accessToContent = loggedUser.access.orders

  return (
    <Content
      data={roleFilteredOrders}
      itemContent={(index, order) => {
        const checked = selectedItems.find((item) => item._id === order._id)
        return (
          <OrderCard
            key={order._id}
            order={order}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter((item) => item._id !== order._id)
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== order._id
                            ),
                            order,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.orders.open(order)}
            onEdit={
              accessToContent.edit(order)
                ? () => modals.orders.open(order, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(order)
                ? () => modals.orders.delete(order)
                : null
            }
            onClone={
              accessToContent.add
                ? () => {
                    const orderClone = { ...order }
                    delete orderClone._id
                    modals.orders.open(orderClone)
                  }
                : null
            }
            onProductEditClick={(product) =>
              loggedUser.access.products.edit(product)
                ? () => modals.products.open(product, null, null, true)
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
                    modals.productCirculations.open({
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
        )
      }}
      onFabClick={accessToContent.add ? () => modals.orders.open() : null}
      messageIfNoData="Заказов нет"
    />
  )
}

export default OrdersContent
