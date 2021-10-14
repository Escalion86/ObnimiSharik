import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  loggedUser,
  product,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly = !['dev', 'admin'].includes(loggedUser.role)
  return (
    <Modal
      onClose={onClose}
      onDelete={product?._id && onDelete}
      readOnly={readOnly}
    >
      <ProductForm
        product={product}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default ProductModal
