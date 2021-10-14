import { DevToDoForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const DevToDoModal = ({
  role,
  devToDo,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={devToDo?._id && onDelete}>
      <DevToDoForm devToDo={devToDo} afterConfirm={afterConfirm} role={role} />
    </Modal>
  )
}

export default DevToDoModal
