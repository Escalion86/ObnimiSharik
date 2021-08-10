import roleRus from '@helpers/roleRus'
import Card from './Card'

export const UserCard = ({ user, onClick = () => {}, onDelete = null }) => (
  <Card>
    <div className="flex-1">
      <div className="flex justify-between space-x-4">
        <div
          className="font-semibold"
          // onClick={() => onClick(invitation)}
        >
          {user.name}
        </div>
        <div className="flex-1 italic">{user.email}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-bold">{roleRus(user.role)}</div>
    </div>
  </Card>
)

export default UserCard
