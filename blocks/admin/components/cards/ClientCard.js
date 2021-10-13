import roleRus from '@helpers/roleRus'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import ContactsIconsButtons from './forCards/ContactsIconsButtons'

export const ClientCard = ({
  client,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  return (
    <Card inLine onClick={() => onClick(client)}>
      <div
        className={
          'w-2 rounded-l-lg' +
          (client.gender === 'male'
            ? ' bg-blue-400'
            : client.gender === 'famale'
            ? ' bg-red-400'
            : '')
        }
      />
      <CardContainer className="items-center">
        <div className="items-center flex-1">
          <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
            <div className="font-semibold">{client.name}</div>
            <div className="flex-1 italic">{client.email}</div>
          </div>
        </div>
        {/* <div className="text-right"> */}
        {/* <div className="font-bold">{roleRus(user.role)}</div> */}
        {/* <div className="italic">{'123'}</div> */}
        {/* </div> */}
        <ContactsIconsButtons user={client} />
      </CardContainer>
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default ClientCard
