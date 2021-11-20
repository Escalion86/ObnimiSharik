import addCountToProducts from '@helpers/addCountToProducts'
import addCountToSets from '@helpers/addCountToSets'
import {
  fetchingAll,
  fetchingClients,
  fetchingDevToDo,
  fetchingInvitations,
  fetchingOrders,
  fetchingPayments,
  fetchingProductCirculations,
  fetchingProducts,
  fetchingProductTypes,
  fetchingSets,
  fetchingSetTypes,
  fetchingUsers,
  fetchingDistricts,
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
  setDevToDo,
  setDistricts,
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
  VersionHistoryModal,
  ConfirmModal,
  ProductCirculationModal,
  ClientModal,
  OrderModal,
  PaymentModal,
  DevToDoModal,
  DistrictModal,
} from '@adminblocks/modals'
import addCountToProductTypes from '@helpers/addCountToProductTypes'
import addCountToSetTypes from '@helpers/addCountToSetTypes'
import findDataWithId from '@helpers/findDataWithId'
import formatDateTime from '@helpers/formatDateTime'
import { DEFAULT_USER } from '@helpers/constants'

const modals = (dispatch, data, loggedUser = DEFAULT_USER) => {
  const modals = {
    openProductModal: (product, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <ProductModal
            loggedUser={loggedUser}
            product={product}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingProducts((result) =>
                dispatch(
                  setProducts(
                    addCountToProducts(result, data.productCirculations, false)
                  )
                )
              )
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteProduct(product, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(product._id)
              })
            }}
          />
        ))
      ),
    openSetModal: (set, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <SetModal
            loggedUser={loggedUser}
            set={set}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingSets((result) =>
                dispatch(
                  setSets(
                    addCountToSets(result, data.productCirculations, false)
                  )
                )
              )
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteSet(set, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(set._id)
              })
            }}
          />
        ))
      ),
    openProductTypeModal: (productType, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <ProductTypeModal
            loggedUser={loggedUser}
            productType={productType}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingProductTypes((result) =>
                dispatch(
                  setProductTypes(addCountToProductTypes(result, data.products))
                )
              )
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteProductType(productType, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(productType._id)
              })
            }}
          />
        ))
      ),
    openSetTypeModal: (setType, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <SetTypeModal
            loggedUser={loggedUser}
            setType={setType}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingSetTypes((result) =>
                dispatch(setSetTypes(addCountToSetTypes(result, data.sets)))
              )
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteSetType(setType, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(setType._id)
              })
            }}
          />
        ))
      ),
    openTildaImportModal: (afterConfirm) =>
      dispatch(
        addModal((modalId) => (
          <TildaImportModal
            {...data}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingAll((result) => dispatch(setAllData(result)))
            }}
          />
        ))
      ),
    openUserModal: (user, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <UserModal
            loggedUser={loggedUser}
            user={user}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingUsers((result) => dispatch(setUsers(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteUser(user, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(user._id)
              })
            }}
          />
        ))
      ),
    openInvitationModal: (invitation, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <InvitationModal
            loggedUser={loggedUser}
            invitation={invitation}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingInvitations((result) => dispatch(setInvitations(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteInvitation(invitation, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(invitation._id)
              })
            }}
          />
        ))
      ),
    openProductCirculationModal: (
      productCirculation,
      afterConfirm,
      afterDelete,
      edit
    ) =>
      dispatch(
        addModal((modalId) => (
          <ProductCirculationModal
            loggedUser={loggedUser}
            productCirculation={productCirculation}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingProductCirculations((result) =>
                dispatch(setProductCirculations(result, true))
              )
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteProductCirculation(productCirculation, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(productCirculation._id)
              })
            }}
          />
        ))
      ),
    openClientModal: (client, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <ClientModal
            loggedUser={loggedUser}
            client={client}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingClients((result) => dispatch(setClients(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteClient(client, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(client._id)
              })
            }}
          />
        ))
      ),
    openDevToDoModal: (devToDo, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <DevToDoModal
            loggedUser={loggedUser}
            devToDo={devToDo}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingDevToDo((result) => dispatch(setDevToDo(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteDevToDo(devToDo, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(devToDo._id)
              })
            }}
          />
        ))
      ),
    openDistrictModal: (district, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <DistrictModal
            loggedUser={loggedUser}
            district={district}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingDistricts((result) => dispatch(setDistricts(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteDistrict(district, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(district._id)
              })
            }}
          />
        ))
      ),
    openOrderModal: (order, afterConfirm, afterDelete, edit) =>
      dispatch(
        addModal((modalId) => (
          <OrderModal
            loggedUser={loggedUser}
            order={order}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingOrders((result) => dispatch(setOrders(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeleteOrder(order, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(order._id)
              })
            }}
          />
        ))
      ),
    openPaymentModal: (payment, afterConfirm, afterDelete, edit = false) =>
      dispatch(
        addModal((modalId) => (
          <PaymentModal
            loggedUser={loggedUser}
            payment={payment}
            modals={modals}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={(res) => {
              afterConfirm && afterConfirm(res)
              fetchingPayments((result) => dispatch(setPayments(result)))
            }}
            edit={edit}
            onDelete={(onConfirm) => {
              modals.openDeletePayment(payment, () => {
                onConfirm && onConfirm()
                afterDelete && afterDelete(payment._id)
              })
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
    openVersionHistoryModal: () =>
      dispatch(
        addModal((modalId) => (
          <VersionHistoryModal onClose={() => modals.closeModal(modalId)} />
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
            null,
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
            null,
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
            null,
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
            null,
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
            null,
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
            null,
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
          '" от ' +
          formatDateTime(productCirculation.purchasedAt) +
          '?',
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
            null,
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
            null,
            'Ошибка при удалении клиента "' + client.name + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteDevToDo: (devToDo, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление заявки',
        'Вы уверены что хотите удалить заявку № ' + devToDo.number + '?',
        () => {
          deleteData(
            '/api/devtodo/' + devToDo._id,
            () => fetchingDevToDo((result) => dispatch(setDevToDo(result))),
            'Заявка № ' + devToDo.number + '" удалена',
            null,
            'Ошибка при удалении заявки № ' + devToDo.number + '"'
          )
          if (onConfirm) onConfirm()
        }
      ),
    openDeleteDistrict: (district, onConfirm = null) =>
      modals.openConfirmModal(
        'Удаление района',
        'Вы уверены что хотите удалить район "' + district.name + '"?',
        () => {
          deleteData(
            '/api/districts/' + district._id,
            () => fetchingDistricts((result) => dispatch(setDistricts(result))),
            'Район "' + district.name + '" удален',
            null,
            'Ошибка при удалении района "' + district.name + '"'
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
            null,
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
            null,
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
            onClose={() => modals.closeModal(modalId)}
          />
        ))
      ),
    closeModal: (modalId) => dispatch(removeModal(modalId)),
  }
  return modals
}

export default modals
