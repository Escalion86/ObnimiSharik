import { PaymentForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const PaymentModal = ({
  payment,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={payment?._id && onDelete}>
      <PaymentForm payment={payment} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default PaymentModal
