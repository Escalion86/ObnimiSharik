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
      <Form handleSubmit={onConfirm} title={title} buttonName="ОК" cancelButton>
        {message}
      </Form>
    </Modal>
  )
}

export default ConfirmModal
