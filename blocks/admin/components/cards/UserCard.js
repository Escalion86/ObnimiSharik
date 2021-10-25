import roleRus from '@helpers/roleRus'
import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import ContactsIconsButtons from './forCards/ContactsIconsButtons'
import { GENDERS } from '@helpers/constants'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UserCard = ({
  user,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  const gender = GENDERS.find((genderItem) => genderItem.value === user.gender)
  return (
    <Card className="items-center" inLine onClick={() => onClick(user)}>
      {/* <div
        className={
          'flex justify-center items-center w-9 rounded-l-lg text-white bg-' +
          (gender ? gender.color + '-400' : 'gray-400')
        }
      >
        <FontAwesomeIcon icon={gender?.icon ?? faQuestion} size="lg" />
      </div> */}
      <img
        className="object-cover rounded-l-lg max-h-22"
        src={
          user.image ? user.image : `/img/users/${user.gender ?? 'male'}.jpg`
        }
        alt="user"
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
