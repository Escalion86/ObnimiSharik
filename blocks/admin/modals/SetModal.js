import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetModal = ({
  role,
  set,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={set?._id && onDelete} twoCols>
      <SetForm set={set} afterConfirm={afterConfirm} role={role} />
    </Modal>
  )
}

export default SetModal
