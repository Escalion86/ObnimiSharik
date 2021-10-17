import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import ContactsIconsButtons from './forCards/ContactsIconsButtons'
import { GENDERS } from '@helpers/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

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
          'flex justify-center items-center w-9 rounded-l-lg text-white bg-' +
          (gender ? gender.color + '-400' : 'gray-400')
        }
      >
        <FontAwesomeIcon icon={gender?.icon ?? faQuestion} size="lg" />
      </div>
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
