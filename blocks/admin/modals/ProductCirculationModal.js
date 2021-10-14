import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductCirculationModal = ({
  loggedUser,
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
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default ProductCirculationModal
