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
} from '@admin/modals'
import addCountToProductTypes from '@helpers/addCountToProductTypes'
import addCountToSetTypes from '@helpers/addCountToSetTypes'
import findDataWithId from '@helpers/findDataWithId'
import formatDateTime from '@helpers/formatDateTime'
import { DEFAULT_USER } from '@helpers/constants'
import getNoun from '@helpers/getNoun'

const deleteFunc = ({
  variable = null,
  data = [],
  afterDelete = null,
  onConfirm = null,
  modals,
  wordsSpelling = {
    nominative: {
      one: 'товар',
      two: 'товара',
      five: 'товаров',
      many: 'товары',
    },
    genitive: {
      one: 'товара',
      many: 'товаров',
    },
    gender: 'male', // famale, neuter
  },
  nameTextFunc = (item) => {
    return item?.name ? `"${item.name}"` : ''
  },
}) => {
  if (!variable) return console.log('error delete: no variable')
  const dataArray = data?._id ? [data] : Array.isArray(data) ? data : null
  if (!dataArray || dataArray.length === 0)
    return console.log('error delete' + variable)

  const wordEnding =
    wordsSpelling.gender === 'famale'
      ? 'a'
      : wordsSpelling.gender === 'neuter'
      ? 'о'
      : ''

  const one = dataArray.length === 1
  modals.openConfirmModal(
    `Удаление ${
      one ? wordsSpelling.genitive.one : wordsSpelling.genitive.many
    }`,
    `Вы уверены что хотите удалить ${getNoun(
      dataArray.length,
      wordsSpelling.nominative.one,
      wordsSpelling.nominative.two,
      wordsSpelling.nominative.five,
      !one
    )}${one ? ` ${nameTextFunc(dataArray[0])}` : ''}?`,
    () => {
      deleteData(
        '/api/' + variable.toLowerCase(),
        afterDelete,
        one && !Array.isArray(dataArray)
          ? `Удален${wordEnding} ${wordsSpelling.nominative.one}${
              one ? ` ${nameTextFunc(dataArray[0])}` : ''
            }`
          : getNoun(
              dataArray.length,
              `${wordsSpelling.nominative.one} удален`,
              `${wordsSpelling.nominative.two} удалены`,
              `${wordsSpelling.nominative.five} удалены`,
              true
            ),
        null,
        `Ошибка при удалении ${
          one
            ? `${wordsSpelling.genitive.one}${
                data?.name ? ` "${data.name}"` : ''
              }`
            : `${wordsSpelling.genitive.many}`
        }`,
        dataArray
      )
      if (onConfirm) onConfirm()
    },
    !one && (
      <ol className="overflow-y-scroll list-decimal pl-11 max-h-60">
        {dataArray.map((item, index) => (
          <li key={'item' + index}>{nameTextFunc(item)}</li>
        ))}
      </ol>
    )
  )
}

const modals = (dispatch, data, loggedUser = DEFAULT_USER) => {
  const modals = {
    products: {
      open: (product, afterConfirm, afterDelete, edit) => {
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
                      addCountToProducts(
                        result,
                        data.productCirculations,
                        false
                      )
                    )
                  )
                )
              }}
              edit={edit}
              onDelete={(onConfirm) => {
                modals.products.delete(product, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(product?._id)
                })
              }}
            />
          ))
        )
      },
      delete: (products = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'products',
          data: products,
          afterDelete: () => {
            fetchingProducts((result) =>
              dispatch(
                setProducts(
                  addCountToProducts(result, data.productCirculations)
                )
              )
            )
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'товар',
              two: 'товара',
              five: 'товаров',
              many: 'товары',
            },
            genitive: {
              one: 'товара',
              many: 'товаров',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
    sets: {
      open: (set, afterConfirm, afterDelete, edit) =>
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
                modals.sets.delete(set, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(set?._id)
                })
              }}
            />
          ))
        ),
      delete: (sets = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'sets',
          data: sets,
          afterDelete: () => {
            fetchingSets((result) =>
              dispatch(
                setSets(addCountToSets(result, data.productCirculations, false))
              )
            )
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'набор',
              two: 'набора',
              five: 'наборов',
              many: 'наборы',
            },
            genitive: {
              one: 'набора',
              many: 'наборов',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
    productTypes: {
      open: (productType, afterConfirm, afterDelete, edit) =>
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
                    setProductTypes(
                      addCountToProductTypes(result, data.products)
                    )
                  )
                )
              }}
              edit={edit}
              onDelete={(onConfirm) => {
                modals.productTypes.delete(productType, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(productType?._id)
                })
              }}
            />
          ))
        ),
      delete: (productTypes = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'productTypes',
          data: productTypes,
          afterDelete: () => {
            fetchingProductTypes((result) =>
              dispatch(
                setProductTypes(addCountToProductTypes(result, data.products))
              )
            )
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'тип товара',
              two: 'типа товара',
              five: 'типов товара',
              many: 'типы товара',
            },
            genitive: {
              one: 'типа товара',
              many: 'типов товара',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
    setTypes: {
      open: (setType, afterConfirm, afterDelete, edit) =>
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
                modals.setTypes.delete(setType, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(setType?._id)
                })
              }}
            />
          ))
        ),
      delete: (setTypes = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'setTypes',
          data: setTypes,
          afterDelete: () => {
            fetchingSetTypes((result) =>
              dispatch(setSetTypes(addCountToSetTypes(result, data.sets)))
            )
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'тип набора',
              two: 'типа набора',
              five: 'типов набора',
              many: 'типы набора',
            },
            genitive: {
              one: 'типа набора',
              many: 'типов набора',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
    productCirculations: {
      open: (productCirculation, afterConfirm, afterDelete, edit) =>
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
                modals.productCirculations.delete(productCirculation, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(productCirculation?._id)
                })
              }}
            />
          ))
        ),
      delete: (
        productCirculations = [],
        onConfirm = null,
        afterDelete = null
      ) =>
        deleteFunc({
          variable: 'productCirculations',
          data: productCirculations,
          afterDelete: () => {
            fetchingProductCirculations((result) =>
              dispatch(setProductCirculations(result, true))
            )
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'движение товара',
              two: 'движения товара',
              five: 'движений товаров',
              many: 'движения товаров',
            },
            genitive: {
              one: 'движения товара',
              many: 'движений товаров',
            },
            gender: 'neuter', // famale, neuter
          },
          nameTextFunc: (item) => {
            const product = findDataWithId(data.products, item?.productId)
            return `(${product.article}) "${product.name}" от ${formatDateTime(
              item.purchasedAt
            )}`
          },
        }),
    },
    payments: {
      open: (payment, afterConfirm, afterDelete, edit = false) =>
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
                modals.payments.delete(payment, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(payment?._id)
                })
              }}
            />
          ))
        ),
      delete: (payments = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'payments',
          data: payments,
          afterDelete: () => {
            fetchingPayments((result) => dispatch(setPayments(result)))
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'транзакцию',
              two: 'транзакции',
              five: 'транзакций',
              many: 'транзакций',
            },
            genitive: {
              one: 'транзакции',
              many: 'транзакций',
            },
            gender: 'famale', // famale, neuter
          },
          nameTextFunc: (item) =>
            `№${item.number} от ${formatDateTime(item.payAt)} на сумму ${
              item.sum / 100
            } ₽`,
        }),
    },
    orders: {
      open: (order, afterConfirm, afterDelete, edit) =>
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
                modals.orders.delete(order, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(order?._id)
                })
              }}
            />
          ))
        ),
      delete: (orders = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'orders',
          data: orders,
          afterDelete: () => {
            fetchingOrders((result) => dispatch(setOrders(result)))
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'заказ',
              two: 'заказа',
              five: 'заказов',
              many: 'заказов',
            },
            genitive: {
              one: 'заказа',
              many: 'заказов',
            },
            gender: 'male', // famale, neuter
          },
          nameTextFunc: (item) =>
            `№${item.number} от ${formatDateTime(
              item.deliveryDateFrom
            )} на сумму ${(item.price - item.discount) / 100} ₽`,
        }),
    },
    clients: {
      open: (client, afterConfirm, afterDelete, edit) =>
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
                modals.clients.delete(client, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(client?._id)
                })
              }}
            />
          ))
        ),
      delete: (clients = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'clients',
          data: clients,
          afterDelete: () => {
            fetchingClients((result) => dispatch(setClients(result)))
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'клиента',
              two: 'клиента',
              five: 'клиентов',
              many: 'клиентов',
            },
            genitive: {
              one: 'клиента',
              many: 'клиентов',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
    users: {
      open: (user, afterConfirm, afterDelete, edit) =>
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
                modals.users.delete(user, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(user?._id)
                })
              }}
            />
          ))
        ),
      delete: (users = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'users',
          data: users,
          afterDelete: () => {
            fetchingUsers((result) => dispatch(setUsers(result)))
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'сотрудника',
              two: 'сотрудника',
              five: 'сотрудников',
              many: 'сотрудников',
            },
            genitive: {
              one: 'сотрудника',
              many: 'сотрудников',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
    invitations: {
      open: (invitation, afterConfirm, afterDelete, edit) =>
        dispatch(
          addModal((modalId) => (
            <InvitationModal
              loggedUser={loggedUser}
              invitation={invitation}
              modals={modals}
              onClose={() => modals.closeModal(modalId)}
              afterConfirm={(res) => {
                afterConfirm && afterConfirm(res)
                fetchingInvitations((result) =>
                  dispatch(setInvitations(result))
                )
              }}
              edit={edit}
              onDelete={(onConfirm) => {
                modals.invitations.delete(invitation, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(invitation?._id)
                })
              }}
            />
          ))
        ),
      delete: (invitations = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'invitations',
          data: invitations,
          afterDelete: () => {
            fetchingInvitations((result) => dispatch(setInvitations(result)))
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'приглашение',
              two: 'приглашения',
              five: 'приглашений',
              many: 'приглашений',
            },
            genitive: {
              one: 'приглашения',
              many: 'приглашений',
            },
            gender: 'neuter', // famale, neuter
          },
          nameTextFunc: (item) => `для ${item.email}`,
        }),
    },
    devToDo: {
      open: (devToDo, afterConfirm, afterDelete, edit) =>
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
                modals.devToDo.delete(devToDo, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(devToDo?._id)
                })
              }}
            />
          ))
        ),
      delete: (devToDo, onConfirm = null) =>
        modals.openConfirmModal(
          'Удаление заявки',
          'Вы уверены что хотите удалить заявку № ' + devToDo?.number + '?',
          () => {
            deleteData(
              '/api/devtodo/' + devToDo?._id,
              () => fetchingDevToDo((result) => dispatch(setDevToDo(result))),
              'Заявка № ' + devToDo?.number + '" удалена',
              null,
              'Ошибка при удалении заявки № ' + devToDo?.number + '"'
            )
            if (onConfirm) onConfirm()
          }
        ),
    },
    districts: {
      open: (district, afterConfirm, afterDelete, edit) =>
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
                modals.districts.delete(district, () => {
                  onConfirm && onConfirm()
                  afterDelete && afterDelete(district?._id)
                })
              }}
            />
          ))
        ),
      delete: (districts = [], onConfirm = null, afterDelete = null) =>
        deleteFunc({
          variable: 'districts',
          data: districts,
          afterDelete: () => {
            fetchingDistricts((result) => dispatch(setDistricts(result)))
            if (afterDelete) afterDelete()
          },
          onConfirm,
          modals,
          wordsSpelling: {
            nominative: {
              one: 'район',
              two: 'района',
              five: 'районов',
              many: 'районов',
            },
            genitive: {
              one: 'района',
              many: 'районов',
            },
            gender: 'male', // famale, neuter
          },
        }),
    },
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
    openConfirmModal: (title, message, onConfirm, children = null) =>
      dispatch(
        addModal((modalId) => (
          <ConfirmModal
            title={title}
            message={message}
            onConfirm={onConfirm}
            onClose={() => modals.closeModal(modalId)}
            children={children}
          />
        ))
      ),
    closeModal: (modalId) => dispatch(removeModal(modalId)),
  }
  return modals
}

export default modals
