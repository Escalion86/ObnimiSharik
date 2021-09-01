import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetModal = ({
  set,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={onDelete}>
      <SetForm
        set={set}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default SetModal
