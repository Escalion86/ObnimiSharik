import React from 'react'
import IconButton from '@components/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import SubTitle from '@admincomponents/SubTitle'
import { UserContentForm } from '@admincomponents/forms'

// const

const UserContent = ({ user, modals }) => {
  return (
    <div>
      {/* <SubTitle title="Экспорт/Импорт" /> */}
      <UserContentForm
        user={user}
        afterConfirm={(data) => {
          afterConfirm(data)
          onClose()
        }}
      />
      {/* <IconButton
        name="Импорт CSV из Tilda"
        onClick={() => modals.openTildaImportModal()}
        inverse
        icon={faDownload}
      /> */}
    </div>
  )
}

export default UserContent
