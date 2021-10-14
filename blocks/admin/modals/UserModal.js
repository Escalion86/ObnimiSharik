import { UserForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const UserModal = ({
  loggedUser,
  user,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete,
}) => {
  return (
    <Modal onClose={onClose} onDelete={user?._id && onDelete}>
      <UserForm
        user={user}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default UserModal
