import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetTypeModal = ({
  setType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={onDelete}>
      <SetTypeForm
        setType={setType}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default SetTypeModal
