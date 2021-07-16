import ProductForm from '@components/ProductForm'
import Modal from '@blocks/admin/modals/Modal'

const ProductModal = ({
  product,
  types,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
      <ProductForm
        forNew={!product}
        title={product ? 'Редактирование товара' : 'Создние товара'}
        btnName={product ? 'Применить' : 'Создать'}
        product={product}
        types={types}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClocse()
        }}
      />
    </Modal>
  )
}

export default ProductModal
