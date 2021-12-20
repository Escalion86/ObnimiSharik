import Form from '@admincomponents/forms/Form'
import Modal from '@admin/modals/Modal'

const ConfirmModal = ({
  title = '',
  message = '',
  onClose = () => {},
  onConfirm = () => {},
  children = null,
}) => {
  return (
    <Modal onClose={onClose}>
      <Form
        handleSubmit={onConfirm}
        title={title}
        buttonName="ОК"
        cancelButton
        closeOnSubmit
      >
        {message}
        {children}
      </Form>
    </Modal>
  )
}

export default ConfirmModal
