import { PaymentForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const PaymentModal = ({
  loggedUser,
  payment,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.payments.read(payment))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данной транзакции"
        onClose={onClose}
      />
    )

  const canEdit = payment?._id && loggedUser.access?.payments.edit(payment)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        payment?._id && loggedUser.access?.payments.delete(payment) && onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        payment?._id && loggedUser.role === 'dev' ? 'ID: ' + payment?._id : null
      }
    >
      <PaymentForm
        payment={payment}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default PaymentModal
