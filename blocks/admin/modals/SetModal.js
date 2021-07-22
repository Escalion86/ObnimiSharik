import { SetForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'

const SetModal = ({
  set,
  setTypes,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
      <SetForm
        set={set}
        setTypes={setTypes}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default SetModal
