import SetForm from '@admincomponents/SetForm'
import Modal from '@adminblocks/modals/Modal'

const ProductModal = ({
  set,
  setTypes,
  onClose = () => {},
  afterConfirm = () => {},
}) => {
  return (
    <Modal onClose={onClose}>
      <SetForm
        set={set}
        setTypes={setTypes}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
    </Modal>
  )
}

export default ProductModal
