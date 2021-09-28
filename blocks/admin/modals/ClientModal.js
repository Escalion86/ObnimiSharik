import { ClientForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ClientModal = ({
  role,
  client,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={client?._id && onDelete}>
      <ClientForm client={client} afterConfirm={afterConfirm} role={role} />
    </Modal>
  )
}

export default ClientModal
