import addCountToProducts from '@helpers/addCountToProducts'
import addCountToSets from '@helpers/addCountToSets'
import {
  fetchingAll,
  fetchingInvitations,
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
} from '@adminblocks/modals'

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
              modals.openDeleteProduct(product)
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
              modals.openDeleteSet(set)
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
                dispatch(setProductTypes(result))
              )
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteProductType(productType)
            }}
          />
        ))
      ),
    openSetTypeModal: (settype, edit) =>
      dispatch(
        addModal((modalId) => (
          <SetTypeModal
            settype={settype}
            onClose={() => modals.closeModal(modalId)}
            afterConfirm={() =>
              fetchingSetTypes((result) => dispatch(setSetTypes(result)))
            }
            edit={edit}
            onDelete={() => {
              modals.openDeleteSetType(setType)
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
              modals.openDeleteUser(user)
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
              modals.openDeleteInvitation(invitation)
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
              modals.openDeleteProductCirculation(productCirculation)
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
                dispatch(setProductTypes(result))
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
            () => fetchingSetTypes((result) => dispatch(setSetTypes(result))),
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
