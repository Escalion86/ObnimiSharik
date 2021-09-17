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
      <ClientForm
        client={client}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ClientModal
