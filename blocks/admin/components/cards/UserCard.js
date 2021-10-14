import roleRus from '@helpers/roleRus'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone,
  faSignOutAlt,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'
import {
  faWhatsapp,
  faViber,
  faTelegramPlane,
} from '@fortawesome/free-brands-svg-icons'
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
  return (
    <Card inLine onClick={() => onClick(user)}>
      <div
        className={
          'w-2 rounded-l-lg bg-' +
            GENDERS.find((genderItem) => genderItem.value === user.gender)
              ?.color ?? 'gray-400'
        }
      />
      <CardContainer className="items-center">
        <div className="items-center flex-1">
          <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
            <div className="font-semibold">{user.name}</div>
            <div className="italic">{user.email}</div>
            <div className="flex-1 font-bold">{roleRus(user.role)}</div>
          </div>
        </div>

        <ContactsIconsButtons user={user} />
      </CardContainer>
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default UserCard
