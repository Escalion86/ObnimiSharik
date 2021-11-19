import { ClientForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const ClientModal = ({
  loggedUser,
  client,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.clients.read(client))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного клиента"
        onClose={onClose}
      />
    )

  const canEdit = client?._id && loggedUser.access?.clients.edit(client)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        client?._id && loggedUser.access?.clients.delete(client) && onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        client?._id && loggedUser.role === 'dev' ? 'ID: ' + client?._id : null
      }
    >
      <ClientForm
        client={client}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default ClientModal
