import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetTypeModal = ({
  loggedUser,
  setType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={setType?._id && onDelete}>
      <SetTypeForm
        setType={setType}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default SetTypeModal
