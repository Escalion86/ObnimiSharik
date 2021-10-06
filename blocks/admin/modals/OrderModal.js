import { OrderForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const OrderModal = ({
  role,
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
      twoCols={role !== 'deliver' && role !== 'aerodesigner'}
      readOnly={readOnly}
    >
      <OrderForm
        order={order}
        afterConfirm={afterConfirm}
        role={role}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default OrderModal
