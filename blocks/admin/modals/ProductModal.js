import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  product,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={product?._id && onDelete}>
      <ProductForm product={product} afterConfirm={afterConfirm} />
    </Modal>
  )
}

export default ProductModal
