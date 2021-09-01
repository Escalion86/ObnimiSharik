import { ProductTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductTypeModal = ({
  productType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={onDelete}>
      <ProductTypeForm
        productType={productType}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductTypeModal
