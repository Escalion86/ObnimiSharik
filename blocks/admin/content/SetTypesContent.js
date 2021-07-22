import React from 'react'
import { TypeCard } from '@admincomponents/Cards'

const SetTypesContent = ({ data }) => {
  const { setTypes } = data

  return (
    <div>
      {setTypes.map((settypes) => (
        <TypeCard key={settypes._id} type={settypes} />
      ))}
    </div>
  )
}

export default SetTypesContent
