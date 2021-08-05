import { SetForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'
import deleteData from '@helpers/deleteData'

const SetModal = ({
  set,
  setTypes,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        set?._id
          ? () => {
              deleteData('/api/sets/' + set._id)
              afterConfirm()
              onClose()
            }
          : null
      }
    >
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
