import { ProductForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  product,
  productTypes,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
      <ProductForm
        product={product}
        productTypes={productTypes}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductModal
