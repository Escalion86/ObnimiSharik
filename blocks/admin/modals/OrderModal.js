import { OrderForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const OrderModal = ({
  loggedUser,
  order,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly = !['dev', 'admin'].includes(role)
  return (
    <Modal
      onClose={onClose}
      onDelete={order?._id && onDelete}
      twoCols={
        loggedUser.role !== 'deliver' && loggedUser.role !== 'aerodesigner'
      }
      readOnly={readOnly}
    >
      <OrderForm
        order={order}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default OrderModal
