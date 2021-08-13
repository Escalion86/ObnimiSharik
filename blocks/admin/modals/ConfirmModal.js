import Form from '@admincomponents/forms/Form'
import Modal from '@adminblocks/modals/Modal'

const ConfirmModal = ({
  title = '',
  message = '',
  onClose = () => {},
  onConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
      <Form
        handleSubmit={() => {
          onConfirm()
          onClose()
        }}
        title={title}
        buttonName="ОК"
        cancelButton={onClose}
      >
        {message}
      </Form>
    </Modal>
  )
}

export default ConfirmModal
