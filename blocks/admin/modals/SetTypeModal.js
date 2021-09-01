import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetTypeModal = ({
  settype,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={onDelete}>
      <SetTypeForm
        settype={settype}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default SetTypeModal
