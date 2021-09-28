import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  role,
  product,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={product?._id && onDelete}>
      <ProductForm product={product} afterConfirm={afterConfirm} role={role} />
    </Modal>
  )
}

export default ProductModal
