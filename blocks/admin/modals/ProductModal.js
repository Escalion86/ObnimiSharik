import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

const ProductModal = ({
  product,
  products,
  productTypes,
  onClose = () => {},
  afterConfirm = () => {},
  confirmModal = (title, message, func) => {},
}) => {
  const onDelete = () => {
    deleteData(
      '/api/products/' + product._id,
      null,
      'Товар "' + product.name + '" удален',
      'Ошибка при удалении товара "' + product.name + '"'
    )
    afterConfirm()
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      onDelete={
        product?._id
          ? () =>
              confirmModal(
                'Удаление товара',
                'Вы уверены что хотите удалить товар "' + product.name + '"?',
                onDelete
              )
          : null
      }
    >
      <ProductForm
        product={product}
        products={products}
        productTypes={productTypes}
        afterConfirm={() => {
          afterConfirm()
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductModal
