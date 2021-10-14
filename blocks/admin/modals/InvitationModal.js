import { InvitationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const InvitationModal = ({
  loggedUser,
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
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default InvitationModal
