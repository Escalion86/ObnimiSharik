import React from 'react'
import IconButton from '@admincomponents/IconButton'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'
import SubTitle from '@admincomponents/SubTitle'
import { UserContentForm } from '@admincomponents/forms'
import { useDispatch } from 'react-redux'
import { fetchingUsers } from '@helpers/fetchers'
import { setUsers } from '@state/actions'

// const

const UserContent = ({ data, modals, loggedUser }) => {
  const dispatch = useDispatch()
  return (
    <div className="relative w-full h-full px-3 mt-1 overflow-y-hidden">
      {/* <SubTitle title="Экспорт/Импорт" /> */}
      <UserContentForm
        loggedUser={loggedUser}
        afterConfirm={() => {
          fetchingUsers((result) => dispatch(setUsers(result)))
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
