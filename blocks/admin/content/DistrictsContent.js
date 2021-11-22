import { DistrictCard } from '@admincomponents/cards'
import Content from './Content'

const DistrictsContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.districts

  return (
    <Content
      data={data}
      itemContent={(index, district) => (
        <DistrictCard
          key={district._id}
          district={district}
          loggedUser={loggedUser}
          onClick={() => modals.openDistrictModal(district)}
          onEdit={
            accessToContent.edit(district)
              ? () => modals.openDistrictModal(district, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(district)
              ? () => modals.openDeleteDistrict(district)
              : null
          }
        />
      )}
      onFabClick={accessToContent.add ? () => modals.openDistrictModal() : null}
      messageIfNoData="Адресов доставки нет"
    />
  )
}

export default DistrictsContent
