import { UserForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

const UserModal = ({ user, onClose = () => {}, afterConfirm = () => {} }) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        user?._id
          ? () => {
              deleteData('/api/users/' + invitation._id)
              afterConfirm()
              onClose()
            }
          : null
      }
    >
      <UserForm
        user={user}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default UserModal
