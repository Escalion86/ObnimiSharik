import { InvitationForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'

const InvitationModal = ({
  invitation,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
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
