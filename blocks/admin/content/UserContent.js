import React from 'react'
import IconButton from '@components/IconButton'
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
    <div className="px-3">
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
