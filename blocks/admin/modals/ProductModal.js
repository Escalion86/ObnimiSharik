import { ProductForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const ProductModal = ({
  loggedUser,
  product,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.products.read(product))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного товара"
        onClose={onClose}
      />
    )

  const canEdit = product?._id && loggedUser.access?.products.edit(product)
  return (
    <Modal
      onClose={onClose}
      onDelete={
        product?._id && loggedUser.access?.products.delete(product) && onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
    >
      <ProductForm
        product={product}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default ProductModal
