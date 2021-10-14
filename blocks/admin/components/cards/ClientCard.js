import roleRus from '@helpers/roleRus'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import ContactsIconsButtons from './forCards/ContactsIconsButtons'
import { GENDERS } from '@helpers/constants'

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
          'w-2 rounded-l-lg bg-' +
            GENDERS.find((genderItem) => genderItem.value === client.gender)
              ?.color ?? 'gray-400'
        }
      />
      <CardContainer className="items-center">
        <div className="items-center flex-1">
          <div className="flex flex-col justify-between gap-x-4 laptop:flex-row">
            <div className="font-semibold">{client.name}</div>
            <div className="flex-1 italic">{client.email}</div>
          </div>
        </div>
      </CardContainer>
      <div className="flex flex-col-reverse items-end justify-between laptop:flex-row laptop:items-center">
        <ContactsIconsButtons user={client} />
        <CardButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </Card>
  )
}

export default ClientCard
