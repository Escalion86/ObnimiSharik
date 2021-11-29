import Modal from '@admin/modals/Modal'

const MessageModal = ({ message, onClose = () => {} }) => {
  return (
    <Modal onClose={onClose}>
      <div>{message}</div>
    </Modal>
  )
}

export default MessageModal
