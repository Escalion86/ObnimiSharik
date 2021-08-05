import { SetTypeForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'
import deleteData from '@helpers/deleteData'

const SetTypeModal = ({
  settype,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        settype?._id
          ? () => {
              deleteData('/api/settypes/' + settype._id)
              afterConfirm()
              onClose()
            }
          : null
      }
    >
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
