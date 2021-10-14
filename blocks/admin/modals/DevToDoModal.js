import { DevToDoForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const DevToDoModal = ({
  loggedUser,
  devToDo,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly =
    !['dev'].includes(loggedUser.role) &&
    (loggedUser._id !== devToDo.userId || devToDo.status !== 'created')
  return (
    <Modal
      onClose={onClose}
      onDelete={devToDo?._id && onDelete}
      readOnly={readOnly}
    >
      <DevToDoForm
        devToDo={devToDo}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default DevToDoModal
