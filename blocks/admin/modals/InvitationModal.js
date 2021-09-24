import { InvitationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const InvitationModal = ({
  invitation,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={invitation?._id && onDelete}>
      <InvitationForm invitation={invitation} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default InvitationModal
