import { ProductTypeForm } from '@admincomponents/Forms'
import Modal from '@adminblocks/modals/Modal'
import deleteData from '@helpers/deleteData'

const ProductTypeModal = ({
  producttype,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal
      onClose={onClose}
      onDelete={
        producttype?._id
          ? () => {
              deleteData('/api/producttypes/' + producttype._id)
              afterConfirm()
              onClose()
            }
          : null
      }
    >
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
