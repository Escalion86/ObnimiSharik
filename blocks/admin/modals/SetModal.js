import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'
import { useSelector } from 'react-redux'

const SetModal = ({
  set,
  onClose = () => {},
  afterConfirm = () => {},
  confirmModal = (title, message, func) => {},
}) => {
  const { products, setTypes } = useSelector((state) => state)
  const onDelete = () => {
    deleteData(
      '/api/sets/' + set._id,
      null,
      'Набор "' + set.name + '" удален',
      'Ошибка при удалении набора "' + set.name + '"'
    )
    afterConfirm()
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      onDelete={
        set?._id
          ? () =>
              confirmModal(
                'Удаление набора',
                'Вы уверены что хотите удалить набора "' + set.name + '"?',
                onDelete
              )
          : null
      }
    >
      <SetForm
        set={set}
        setTypes={setTypes}
        products={products}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default SetModal
