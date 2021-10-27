import React from 'react'
import { DistrictCard } from '@admincomponents/cards'
import { DEFAULT_DISTRICT } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const DistrictsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Адресов доставки нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, district) => (
        <DistrictCard
          key={district._id}
          district={district}
          loggedUser={loggedUser}
          onClick={() => modals.openDistrictModal(district)}
          onEdit={() => modals.openDistrictModal(district, null, null, true)}
          onDelete={() => modals.openDeleteDistrict(district)}
        />
      )}
    />
  )
}

export default DistrictsContent
