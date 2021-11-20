import { OrderForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const OrderModal = ({
  loggedUser,
  order,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.orders.read(order))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного заказа"
        onClose={onClose}
      />
    )

  const canEdit = order?._id && loggedUser.access?.orders.edit(order)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        order?._id && loggedUser.access?.orders.delete(order) && onDelete
      }
      twoCols={
        loggedUser.role !== 'deliver' && loggedUser.role !== 'aerodesigner'
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        order?._id && loggedUser.role === 'dev' ? 'ID: ' + order?._id : null
      }
      modals={modals}
    >
      <OrderForm
        order={order}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default OrderModal
