import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  product,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={product?._id && onDelete}
      //   product?._id
      //     ? () =>
      //         confirmModal(
      //           'Удаление товара',
      //           'Вы уверены что хотите удалить товар "' + product.name + '"?',
      //           onDelete
      //         )
      //     : null
      // }
    >
      <ProductForm
        product={product}
        afterConfirm={() => {
          afterConfirm()
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductModal
