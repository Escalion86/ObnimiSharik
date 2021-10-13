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

const ContactIconBtn = ({ url, icon, className = null }) => (
  <FontAwesomeIcon
    className={
      'ml-4 cursor-pointer text-primary hover:text-toxic duration-300 hover:scale-125' +
      (className ? ' ' + className : '')
    }
    icon={icon}
    onClick={(event) => {
      event.stopPropagation()
      window.open(url)
    }}
  />
)

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
          'w-2 rounded-l-lg' +
          (user.gender === 'male'
            ? ' bg-blue-400'
            : user.gender === 'famale'
            ? ' bg-red-400'
            : '')
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

        {user.phone && (
          <ContactIconBtn
            icon={faPhone}
            className="text-yellow-600"
            url={'tel:+' + user.phone}
          />
        )}
        {user.whatsapp && (
          <ContactIconBtn
            icon={faWhatsapp}
            className="text-green-600"
            url={'https://wa.me/' + user.whatsapp}
          />
        )}
        {user.viber && (
          <ContactIconBtn
            icon={faViber}
            className="text-purple-600"
            url={'viber://chat?number=' + user.viber}
          />
        )}
        {user.telegram && (
          <ContactIconBtn
            icon={faTelegramPlane}
            url={'https://t.me/' + user.telegram}
          />
        )}
      </CardContainer>
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default UserCard
