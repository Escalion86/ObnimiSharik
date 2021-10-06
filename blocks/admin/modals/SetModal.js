import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const SetModal = ({
  role,
  set,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly = !['dev', 'admin'].includes(role)
  return (
    <Modal
      onClose={onClose}
      onDelete={set?._id && onDelete}
      twoCols
      readOnly={readOnly}
    >
      <SetForm
        set={set}
        afterConfirm={afterConfirm}
        role={role}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default SetModal
