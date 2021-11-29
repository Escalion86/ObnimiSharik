import { ProductCirculationForm } from '@admincomponents/forms'
import Modal from '@admin/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const ProductCirculationModal = ({
  loggedUser,
  productCirculation,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.productCirculations.read(productCirculation))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного движения товара"
        onClose={onClose}
      />
    )

  const canEdit =
    productCirculation?._id &&
    loggedUser.access?.productCirculations.edit(productCirculation)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        productCirculation?._id &&
        loggedUser.access?.productCirculations.delete(productCirculation) &&
        onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        productCirculation?._id && loggedUser.role === 'dev'
          ? 'ID: ' + productCirculation?._id
          : null
      }
      modals={modals}
    >
      <ProductCirculationForm
        productCirculation={productCirculation}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default ProductCirculationModal
