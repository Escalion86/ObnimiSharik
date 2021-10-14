import roleRus from '@helpers/roleRus'
import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import ContactsIconsButtons from './forCards/ContactsIconsButtons'
import { GENDERS } from '@helpers/constants'

export const UserCard = ({
  user,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  const gender = GENDERS.find((genderItem) => genderItem.value === user.gender)
  return (
    <Card className="items-center" inLine onClick={() => onClick(user)}>
      <div
        className={
          'w-2 rounded-l-lg bg-' + (gender ? gender.color + '-400' : 'gray-400')
        }
      />
      <CardContainer className="items-center">
        <div className="flex flex-col justify-between gap-x-4 laptop:flex-row">
          <div className="font-semibold">{user.name}</div>
          <div className="italic">{user.email}</div>
          <div className="flex-1 font-bold">{roleRus(user.role)}</div>
        </div>
      </CardContainer>
      <div className="flex flex-col-reverse items-end justify-between laptop:flex-row laptop:items-center">
        <ContactsIconsButtons user={user} />
        <CardButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </Card>
  )
}

export default UserCard
