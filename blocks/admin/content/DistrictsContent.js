import React from 'react'
import { DistrictCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const DistrictsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Адресов доставки нет'</div>

  const accessToContent = loggedUser.access.districts

  return (
    <Virtuoso
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
    />
  )
}

export default DistrictsContent
