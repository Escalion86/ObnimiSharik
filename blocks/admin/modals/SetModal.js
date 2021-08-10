import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

const SetModal = ({
  set,
  setTypes,
  products,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        set?._id
          ? () => {
              deleteData(
                '/api/sets/' + set._id,
                null,
                'Набор "' + set.name + '" удален',
                'Ошибка при удалении набора "' + set.name + '"'
              )
              afterConfirm()
              onClose()
            }
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
