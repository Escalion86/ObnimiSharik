import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetModal = ({
  set,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={set?._id && onDelete} twoCols>
      <SetForm set={set} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default SetModal
