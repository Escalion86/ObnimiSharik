import ProductForm from '@components/ProductForm'
import Modal from '@blocks/admin/modals/Modal'

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
