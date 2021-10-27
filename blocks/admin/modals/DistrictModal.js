import { DistrictForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'

const DistrictModal = ({
  loggedUser,
  district,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
}) => {
  const readOnly = !(!district || loggedUser.role === 'dev')

  return (
    <Modal
      onClose={onClose}
      onDelete={district?._id && onDelete}
      readOnly={readOnly}
    >
      <DistrictForm
        district={district}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        readOnly={readOnly}
      />
    </Modal>
  )
}

export default DistrictModal
