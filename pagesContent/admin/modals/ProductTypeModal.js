import { ProductTypeForm } from '@admincomponents/forms'
import Modal from '@admin/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const ProductTypeModal = ({
  loggedUser,
  productType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.productTypes.read(productType))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного типа товара"
        onClose={onClose}
      />
    )

  const canEdit =
    productType?._id && loggedUser.access?.productTypes.edit(productType)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        productType?._id &&
        loggedUser.access?.productTypes.delete(productType) &&
        onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        productType?._id && loggedUser.role === 'dev'
          ? 'ID: ' + productType?._id
          : null
      }
      modals={modals}
    >
      <ProductTypeForm
        productType={productType}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default ProductTypeModal
