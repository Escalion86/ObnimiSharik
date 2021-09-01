import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const ProductCirculationModal = ({
  productCirculation,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  return (
    <Modal onClose={onClose} onDelete={onDelete}>
      <ProductCirculationForm
        productCirculation={productCirculation}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductCirculationModal
