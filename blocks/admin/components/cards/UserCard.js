import roleRus from '@helpers/roleRus'
import Card from './Card'

export const UserCard = ({ user, onClick = () => {}, onDelete = null }) => {
  return (
    <Card>
      <div className="flex-1">
        <div className="flex justify-between space-x-4">
          <div
            className="font-semibold cursor-pointer text-primary hover:text-toxic"
            onClick={() => onClick(user)}
          >
            {user.name}
          </div>
          <div className="flex-1 italic">{user.email}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{roleRus(user.role)}</div>
        <div className="italic">{'123'}</div>
      </div>
    </Card>
  )
}

export default UserCard
