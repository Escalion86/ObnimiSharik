import roleRus from '@helpers/roleRus'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export const UserCard = ({ user, onClick = () => {}, onDelete = null }) => {
  return (
    <Card onClick={() => onClick(user)}>
      <div className="items-center flex-1">
        <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
          <div className="font-semibold">{user.name}</div>
          <div className="flex-1 italic">{user.email}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{roleRus(user.role)}</div>
        {/* <div className="italic">{'123'}</div> */}
      </div>
      {user.phone && (
        <FontAwesomeIcon
          className="ml-4 cursor-pointer text-primary hover:text-toxic"
          icon={faPhone}
          onClick={(event) => {
            event.stopPropagation()
            window.open('tel:+' + user.phone)
          }}
        />
      )}
      {user.whatsapp && (
        <FontAwesomeIcon
          className="ml-4 cursor-pointer text-primary hover:text-toxic"
          icon={faWhatsapp}
          onClick={(event) => {
            event.stopPropagation()
            window.open('https://wa.me/' + user.phone)
          }}
        />
      )}
    </Card>
  )
}

export default UserCard
