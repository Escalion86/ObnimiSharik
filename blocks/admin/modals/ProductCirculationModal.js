import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'
import findDataWithId from '@helpers/findDataWithId'
import { useSelector } from 'react-redux'

const ProductCirculationModal = ({
  productCirculation,
  onClose = () => {},
  afterConfirm = () => {},
  confirmModal = (title, message, func) => {},
}) => {
  const { products } = useSelector((state) => state)
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
