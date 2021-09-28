import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetTypeModal = ({
  role,
  setType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={setType?._id && onDelete}>
      <SetTypeForm setType={setType} afterConfirm={afterConfirm} role={role} />
    </Modal>
  )
}

export default SetTypeModal
