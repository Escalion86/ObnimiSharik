import Card from './Card'
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
  const gender = GENDERS.find(
    (genderItem) => genderItem.value === client.gender
  )
  return (
    <Card inLine onClick={() => onClick(client)}>
      <div
        className={
          'w-2 rounded-l-lg bg-' + (gender ? gender.color + '-400' : 'gray-400')
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
