import { UserForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const UserModal = ({
  user,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete,
}) => {
  return (
    <Modal onClose={onClose} onDelete={user?._id && onDelete}>
      <UserForm user={user} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default UserModal
