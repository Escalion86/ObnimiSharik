import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  role,
  product,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly = !['dev', 'admin'].includes(role)
  return (
    <Modal
      onClose={onClose}
      onDelete={product?._id && onDelete}
      readOnly={readOnly}
    >
      <ProductForm
        product={product}
        afterConfirm={afterConfirm}
        role={role}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default ProductModal
