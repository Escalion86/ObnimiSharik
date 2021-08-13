import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

const ProductCirculationModal = ({
  productCirculation,
  onClose = () => {},
  afterConfirm = () => {},
  confirmModal = (title, message, func) => func(),
}) => {
  const onDelete = () => {
    deleteData(
      '/api/productcirculation/' + productCirculation._id,
      null,
      'Движние товара "' + productCirculation.name + '" удалено',
      'Ошибка при удалении движения товара "' + productCirculation.name + '"'
    )
    afterConfirm()
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      onDelete={
        productCirculation?._id
          ? () =>
              confirmModal(
                'Удаление движения товара',
                'Вы уверены что хотите удалить движение товара "' +
                  productCirculation.name +
                  '"?',
                onDelete
              )
          : null
      }
    >
      <ProductCirculationForm
        productCirculation={productCirculation}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductCirculationModal
