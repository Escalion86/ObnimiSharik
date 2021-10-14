import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetModal = ({
  loggedUser,
  set,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly = !['dev', 'admin'].includes(loggedUser.role)
  return (
    <Modal
      onClose={onClose}
      onDelete={set?._id && onDelete}
      twoCols
      readOnly={readOnly}
    >
      <SetForm
        set={set}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default SetModal
