import addCountToProducts from '@helpers/addCountToProducts'
import addCountToSets from '@helpers/addCountToSets'
import {
  fetchingAll,
  fetchingClients,
  fetchingInvitations,
  fetchingOrders,
  fetchingPayments,
  fetchingProductCirculations,
  fetchingProducts,
  fetchingProductTypes,
  fetchingSets,
  fetchingSetTypes,
  fetchingUsers,
} from '@helpers/fetchers'
import {
  setAllData,
  setInvitations,
  setProductCirculations,
  setProducts,
  setProductTypes,
  setSets,
  setSetTypes,
  setUsers,
  setClients,
  setOrders,
  setPayments,
} from '@state/actions'
import {
  addModal,
  removeAllModals,
  removeModal,
} from '@state/actions/modalsActions'
import { deleteData } from '@helpers/CRUD'
import {
  ProductModal,
  SetModal,
  ProductTypeModal,
  SetTypeModal,
  InvitationModal,
  TildaImportModal,
  UserModal,
  MessageModal,
  ConfirmModal,
  ProductCirculationModal,
  ClientModal,
  OrderModal,
  PaymentModal,
} from '@adminblocks/modals'
import addCountToProductTypes from '@helpers/addCountToProductTypes'
import addCountToSetTypes from '@helpers/addCountToSetTypes'

const modals = (dispatch, data) => {
  const modals = {
    openProductModal: (product, edit) =>
      dispatch(
        addModal((modalId) => (
          <ProductModal
            product={product}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingProducts((result) =>
                dispatch(
                  setProducts(
                    addCountToProducts(result, data.productCirculations, false)
                  )
                )
              )
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteProduct(product, () =>
                modals.closeModal(modalId)
              )
            }}
          />
        ))
      ),
    openSetModal: (set, edit) =>
      dispatch(
        addModal((modalId) => (
          <SetModal
            set={set}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingSets((result) =>
                dispatch(
                  setSets(
                    addCountToSets(result, data.productCirculations, false)
                  )
                )
              )
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteSet(set, () => modals.closeModal(modalId))
            }}
          />
        ))
      ),
    openProductTypeModal: (productType, edit) =>
      dispatch(
        addModal((modalId) => (
          <ProductTypeModal
            productType={productType}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingProductTypes((result) =>
                dispatch(
                  setProductTypes(addCountToProductTypes(result, data.products))
                )
              )
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteProductType(productType, () =>
                modals.closeModal(modalId)
              )
            }}
          />
        ))
      ),
    openSetTypeModal: (setType, edit) =>
      dispatch(
        addModal((modalId) => (
          <SetTypeModal
            setType={setType}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingSetTypes((result) =>
                dispatch(setSetTypes(addCountToSetTypes(result, data.sets)))
              )
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteSetType(setType, () =>
                modals.closeModal(modalId)
              )
            }}
          />
        ))
      ),
    openTildaImportModal: () =>
      dispatch(
        addModal((modalId) => (
          <TildaImportModal
            {...data}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingAll((result) => {
                dispatch(setAllData(result))
              })
            }
          />
        ))
      ),
    openUserModal: (user, edit) =>
      dispatch(
        addModal((modalId) => (
          <UserModal
            user={user}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingUsers((result) => dispatch(setUsers(result)))
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteUser(user, () => modals.closeModal(modalId))
            }}
          />
        ))
      ),
    openInvitationModal: (invitation, edit) =>
      dispatch(
        addModal((modalId) => (
          <InvitationModal
            invitation={invitation}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingInvitations((result) => dispatch(setInvitations(result)))
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteInvitation(invitation, () =>
                modals.closeModal(modalId)
              )
            }}
          />
        ))
      ),
    openProductCirculationModal: (productCirculation, edit) =>
      dispatch(
        addModal((modalId) => (
          <ProductCirculationModal
            productCirculation={productCirculation}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingProductCirculations((result) =>
                dispatch(setProductCirculations(result, true))
              )
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteProductCirculation(productCirculation, () =>
                modals.closeModal(modalId)
              )
            }}
          />
        ))
      ),
    openClientModal: (client, edit) =>
      dispatch(
        addModal((modalId) => (
          <ClientModal
            client={client}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingClients((result) => dispatch(setClients(result)))
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteClient(client, () => modals.closeModal(modalId))
            }}
          />
        ))
      ),
    openOrderModal: (order, edit) =>
      dispatch(
        addModal((modalId) => (
          <OrderModal
            order={order}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingOrders((result) => dispatch(setOrders(result)))
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteOrder(order, () => modals.closeModal(modalId))
            }}
          />
        ))
      ),
    openPaymentModal: (payment, edit) =>
      dispatch(
        addModal((modalId) => (
          <PaymentModal
            payment={payment}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingPayments((result) => dispatch(setPayments(result)))
            }
            edit={edit}
            onDelete={() => {
              modals.openDeletePayment(payment, () =>
                modals.closeModal(modalId)
              )
            }}
          />
        ))
      ),
    openMessageModal: (message) =>
      dispatch(
        addModal((modalId) => (
          <MessageModal
            message={message}
            onClose={() => modals.closeModal(modalId)}
          />
        ))
      ),
    openDeleteProduct: (product, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление товара',
        'Вы уверены что хотите удалить товар "' + product.name + '"?',
        () => {
          deleteData(
            '/api/products/' + product._id,
            () =>
              fetchingProducts((result) =>
                dispatch(
                  setProducts(
                    addCountToProducts(result, data.productCirculations)
                  )
                )
              ),
            'Товар "' + product.name + '" удален',
            'Ошибка при удалении товара "' + product.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteSet: (set, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление набора',
        'Вы уверены что хотите удалить набора "' + set.name + '"?',
        () => {
          deleteData(
            '/api/sets/' + set._id,
            () =>
              fetchingSets((result) =>
                dispatch(
                  setSets(
                    addCountToSets(result, data.productCirculations, false)
                  )
                )
              ),
            'Набор "' + set.name + '" удален',
            'Ошибка при удалении набора "' + set.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteProductType: (productType, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление типа товара',
        'Вы уверены что хотите удалить тип товара "' + productType.name + '"?',
        () => {
          deleteData(
            '/api/producttypes/' + productType._id,
            () =>
              fetchingProductTypes((result) =>
                dispatch(
                  setProductTypes(addCountToProductTypes(result, data.products))
                )
              ),
            'Тип товара "' + productType.name + '" удален',
            'Ошибка при удалении типа товара "' + productType.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteSetType: (setType, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление типа набора',
        'Вы уверены что хотите удалить тип набора "' + setType.name + '"?',
        () => {
          deleteData(
            '/api/settypes/' + setType._id,
            () =>
              fetchingSetTypes((result) =>
                dispatch(setSetTypes(addCountToSetTypes(result, data.sets)))
              ),
            'Тип набора "' + setType.name + '" удален',
            'Ошибка при удалении типа набора "' + setType.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteUser: (user, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление пользователя',
        'Вы уверены что хотите удалить пользователя "' + user.email + '"?',
        () => {
          deleteData(
            '/api/users/' + user._id,
            () => fetchingUsers((result) => dispatch(setUsers(result))),
            'Пользователь "' + user.name + '" удален',
            'Ошибка при удалении пользователя "' + user.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteInvitation: (invitation, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление приглашения',
        'Вы уверены что хотите удалить приглашение для "' +
          invitation.email +
          '"?',
        () => {
          deleteData(
            '/api/invitations/' + invitation._id,
            () =>
              fetchingInvitations((result) => dispatch(setInvitations(result))),
            'Приглашение для "' + invitation.email + '" удалено',
            'Ошибка при удалении приглаения для "' + invitation.email + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteProductCirculation: (productCirculation, onConfirm = null) => {
      const product = findDataWithId(
        data.products,
        productCirculation?.productId
      )
      modals.openConfirmModal(
        'Удаление движения товара',
        'Вы уверены что хотите удалить движение товара (' +
          product.article +
          ') "' +
          product.name +
          '"?',
        () => {
          deleteData(
            '/api/productcirculations/' + productCirculation._id,
            () =>
              fetchingProductCirculations((result) =>
                dispatch(setProductCirculations(result, true))
              ),
            'Движние товара (' +
              product.article +
              ') "' +
              product.name +
              '" удалено',
            'Ошибка при удалении движения товара (' +
              product.article +
              ') "' +
              product.name +
              '"'
          )
          if (onConfirm) onConfirm()
        }
      )
    },
    openDeleteClient: (client, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление клиента',
        'Вы уверены что хотите удалить клиента "' + client.name + '"?',
        () => {
          deleteData(
            '/api/clients/' + client._id,
            () => fetchingClients((result) => dispatch(setClients(result))),
            'Клиент "' + client.name + '" удален',
            'Ошибка при удалении клиента "' + client.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteOrder: (order, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление заказа',
        'Вы уверены что хотите удалить заказ №' + order.number + '?',
        () => {
          deleteData(
            '/api/orders/' + order._id,
            () => fetchingOrders((result) => dispatch(setOrders(result))),
            'Заказ №' + order.number + '" удален',
            'Ошибка при удалении заказа №' + order.number
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeletePayment: (payment, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление транзакции',
        'Вы уверены что хотите удалить транзакцию №' + payment.number + '?',
        () => {
          deleteData(
            '/api/payments/' + payment._id,
            () => fetchingPayments((result) => dispatch(setPayments(result))),
            'Транзакция №' + payment.number + '" удалена',
            'Ошибка при удалении транзакции №' + payment.number
          )
          if (onConfirm) onConfirm()
        }
      ),
    openConfirmModal: (title, message, onConfirm) =>
      dispatch(
        addModal((modalId) => (
          <ConfirmModal
            title={title}
            message={message}
            onConfirm={onConfirm}
            onClose={() => dispatch(removeModal(modalId))}
          />
        ))
      ),
    closeModal: (modalId) => dispatch(removeModal(modalId)),
  }
  return modals
}

export default modals
