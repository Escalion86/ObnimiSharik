import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'
import findDataWithId from '@helpers/findDataWithId'

const ProductCirculationModal = ({
  productCirculation,
  products,
  onClose = () => {},
  afterConfirm = () => {},
  confirmModal = (title, message, func) => {},
}) => {
  const product = findDataWithId(products, productCirculation?.productId)

  const onDelete = () => {
    deleteData(
      '/api/productcirculations/' + productCirculation._id,
      null,
      'Движние товара (' + product.article + ') "' + product.name + '" удалено',
      'Ошибка при удалении движения товара (' +
        product.article +
        ') "' +
        product.name +
        '"'
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
                'Вы уверены что хотите удалить движение товара (' +
                  product.article +
                  ') "' +
                  product.name +
                  '"?',
                onDelete
              )
          : null
      }
    >
      <ProductCirculationForm
        productCirculation={productCirculation}
        products={products}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductCirculationModal
