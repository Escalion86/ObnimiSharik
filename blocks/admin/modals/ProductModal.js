import { ProductForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'
import deleteData from '@helpers/deleteData'

const ProductModal = ({
  product,
  productTypes,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        product?._id
          ? () => {
              deleteData('/api/products/' + product._id)
              afterConfirm()
              onClose()
            }
          : null
      }
    >
      <ProductForm
        product={product}
        productTypes={productTypes}
        afterConfirm={() => {
          afterConfirm()
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductModal
