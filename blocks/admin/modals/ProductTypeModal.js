import { ProductTypeForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'

const ProductTypeModal = ({
  producttype,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
      <ProductTypeForm
        producttype={producttype}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductTypeModal
