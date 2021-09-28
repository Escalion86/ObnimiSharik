import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductCirculationModal = ({
  role,
  productCirculation,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={productCirculation?._id && onDelete}>
      <ProductCirculationForm
        productCirculation={productCirculation}
        afterConfirm={afterConfirm}
        role={role}
      />
    </Modal>
  )
}

export default ProductCirculationModal
