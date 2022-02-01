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
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
  hidden = false,
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
    <Card
      inLine
      onClick={() => onClick(invitation)}
      onCheckClick={onCheckClick}
      multiselectMode={multiselectMode}
      checked={checked}
      hidden={hidden}
    >
      <CardContainer>
        <div className="flex-1">
          <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
            <div>{formatDate(invitation.createdAt)}</div>
            <div className="font-semibold">{invitation.email}</div>
            <div className="flex-1 italic">{roleRus(invitation.role)}</div>
          </div>
        </div>
      </CardContainer>
      <div className="flex flex-col-reverse items-end justify-between gap-y-1 tablet:flex-row tablet:items-center">
        <div className="flex items-end justify-end flex-1 p-1">
          <div className="font-bold">{status}</div>
        </div>
        <CardButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </Card>
  )
}

export default InvitationCard
