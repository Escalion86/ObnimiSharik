import { ClientForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ClientModal = ({
  loggedUser,
  client,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={client?._id && onDelete}>
      <ClientForm
        client={client}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default ClientModal
