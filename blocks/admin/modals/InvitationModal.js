import { InvitationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const InvitationModal = ({
  role,
  invitation,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={invitation?._id && onDelete}>
      <InvitationForm
        invitation={invitation}
        afterConfirm={afterConfirm}
        role={role}
      />
    </Modal>
  )
}

export default InvitationModal
