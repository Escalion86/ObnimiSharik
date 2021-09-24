import { ClientForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ClientModal = ({
  client,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={client?._id && onDelete}>
      <ClientForm client={client} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default ClientModal
