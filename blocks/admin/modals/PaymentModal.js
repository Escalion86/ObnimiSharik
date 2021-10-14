import { PaymentForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const PaymentModal = ({
  loggedUser,
  payment,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={payment?._id && onDelete}>
      <PaymentForm
        payment={payment}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default PaymentModal
