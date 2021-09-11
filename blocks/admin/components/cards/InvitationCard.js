import formatDate from '@helpers/formatDate'
import roleRus from '@helpers/roleRus'
import Card from './Card'
import CardContainer from './CardContainer'
import CardButtons from './forCards/CardButtons'

export const InvitationCard = ({
  invitation,
  onClick = () => {},
  onDelete = null,
  onEdit = null,
}) => {
  let status
  switch (invitation.status) {
    case 'created':
      status = 'Создано'
      break
    case 'confirmed':
      status = 'Принято'
      break
    default:
      status = '?'
      break
  }

  return (
    <Card inLine onClick={() => onClick(invitation)}>
      <CardContainer>
        <div className="flex-1">
          <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
            <div>{formatDate(invitation.createdAt)}</div>
            <div className="font-semibold">{invitation.email}</div>
            <div className="flex-1 italic">{roleRus(invitation.role)}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold">{status}</div>
        </div>
      </CardContainer>
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default InvitationCard
