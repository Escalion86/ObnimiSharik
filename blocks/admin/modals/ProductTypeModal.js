import { ProductTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductTypeModal = ({
  role,
  productType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={productType?._id && onDelete}>
      <ProductTypeForm
        productType={productType}
        afterConfirm={afterConfirm}
        role={role}
      />
    </Modal>
  )
}

export default ProductTypeModal
