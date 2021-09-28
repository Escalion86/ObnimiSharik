import { OrderForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const OrderModal = ({
  role,
  order,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={order?._id && onDelete}
      twoCols={role !== 'deliver' && role !== 'aerodesigner'}
    >
      <OrderForm order={order} afterConfirm={afterConfirm} role={role} />
    </Modal>
  )
}

export default OrderModal
