import { SetTypeForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'

const SetTypeModal = ({
  settype,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
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
