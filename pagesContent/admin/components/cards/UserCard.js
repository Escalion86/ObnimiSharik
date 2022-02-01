import roleRus from '@helpers/roleRus'
import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import ContactsIconsButtons from './forCards/ContactsIconsButtons'
// import { GENDERS } from '@helpers/constants'
import ZoomImage from '@admincomponents/ZoomImage'

export const UserCard = ({
  user,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
  hidden = false,
}) => {
  // const gender = GENDERS.find((genderItem) => genderItem.value === user.gender)
  return (
    <Card
      className="items-center"
      inLine
      onClick={() => onClick(user)}
      onCheckClick={onCheckClick}
      multiselectMode={multiselectMode}
      checked={checked}
      hidden={hidden}
    >
      <div className="h-full min-w-24 laptop:min-w-0">
        <ZoomImage
          image={user?.image}
          noImage={`/img/users/${user?.gender ?? 'noGender'}.jpg`}
          alt="user"
          imageClassName="h-full w-24 max-h-24 laptop:w-10"
          containerClassName="duration-500 h-full"
        />
      </div>
      <CardContainer className="items-center">
        <div className="flex flex-col justify-between laptop:items-center gap-x-4 laptop:flex-row">
          <div className="font-semibold whitespace-nowrap">
            {user?.name ?? ''}
          </div>
          {/* <div className="text-sm italic">{user?.email ?? ''}</div> */}
          <div className="flex-1 italic">{roleRus(user?.role)}</div>
        </div>
      </CardContainer>
      <div className="flex flex-col-reverse items-end justify-between laptop:flex-row laptop:items-center">
        <ContactsIconsButtons user={user} />
        <CardButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </Card>
  )
}

export default UserCard
