import { ProductTypeForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { deleteData } from '@helpers/CRUD'

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
              deleteData(
                '/api/producttypes/' + producttype._id,
                null,
                'Тип товара "' + producttype.name + '" удален',
                'Ошибка при удалении типа товара "' + producttype.name + '"'
              )
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
