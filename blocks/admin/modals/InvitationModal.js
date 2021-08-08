import { InvitationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

const InvitationModal = ({
  invitation,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        invitation?._id
          ? () => {
              deleteData('/api/users/invitations/' + invitation._id)
              afterConfirm()
              onClose()
            }
          : null
      }
    >
      <InvitationForm
        invitation={invitation}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default InvitationModal
