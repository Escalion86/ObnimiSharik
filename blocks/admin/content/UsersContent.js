import React from 'react'
import { UserCard } from '@admincomponents/Cards'
// import UserModal from '@adminblocks/modals/UserModal'
import { fetchingUsers } from '@helpers/fetchers'

const UsersContent = ({ data, setModal = () => {}, updateData = () => {} }) => {
  const { users } = data

  return (
    <div>
      {users.map((user) => {
        // const count = sets.filter((set) =>
        //   set.typesId.includes(settype._id)
        // ).length
        return <UserCard key={user._id} user={user} />
      })}
    </div>
  )
}

export default UsersContent
