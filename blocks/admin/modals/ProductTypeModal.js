import { ProductTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductTypeModal = ({
  loggedUser,
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
        loggedUser={loggedUser}
      />
    </Modal>
  )
}

export default ProductTypeModal
