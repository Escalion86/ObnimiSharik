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
              deleteData(
                '/api/users/' + user._id,
                null,
                'Пользователь "' + user.name + '" удален',
                'Ошибка при удалении пользователя "' + user.name + '"'
              )
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
