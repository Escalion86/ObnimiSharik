import roleRus from '@helpers/roleRus'
import Card from './Card'

export const InvitationCard = ({
  invitation,
  onClick = () => {},
  onDelete = null,
}) => {
  let status
  switch (invitation.status) {
    case 'created':
      status = 'Создано'
      break
    // case 'sended':
    //   status = 'Отправлено'
    //   break
    case 'confirmed':
      status = 'Принято'
      break
    default:
      status = '?'
      break
  }

  return (
    <Card>
      <div className="flex-1">
        <div className="flex justify-between space-x-4">
          <div
            className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
            onClick={() => onClick(invitation)}
          >
            {invitation.email}
          </div>
          <div className="flex-1 italic">{roleRus(invitation.role)}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{status}</div>
      </div>
    </Card>
  )
}

export default InvitationCard
