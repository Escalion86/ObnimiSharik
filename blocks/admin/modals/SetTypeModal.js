import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetTypeModal = ({
  setType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={setType?._id && onDelete}>
      <SetTypeForm setType={setType} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default SetTypeModal
