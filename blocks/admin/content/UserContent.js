import React from 'react'
import IconButton from '@components/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import SubTitle from '@admincomponents/SubTitle'
import { UserContentForm } from '@admincomponents/forms'

// const

const UserContent = ({ data, modals, user }) => {
  return (
    <div className="px-3">
      {/* <SubTitle title="Экспорт/Импорт" /> */}
      <UserContentForm
        user={user}
        afterConfirm={(data) => {
          // afterConfirm(data)
          console.log(`data`, data)
          // onClose()
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
