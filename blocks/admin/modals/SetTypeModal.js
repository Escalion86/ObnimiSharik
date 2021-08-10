import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

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
              deleteData(
                '/api/settypes/' + settype._id,
                null,
                'Тип набора "' + settype.name + '" удален',
                'Ошибка при удалении типа набора "' + settype.name + '"'
              )
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
