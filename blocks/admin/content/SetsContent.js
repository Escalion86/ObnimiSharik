import React, { useState } from 'react'

const SetCard = ({ set }) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white shadow-md">
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic">
          {set.name}
        </div>
        <div className="flex-1 italic">{set.description}</div>
      </div>
    </div>
  </div>
)

const SetsContent = ({ data }) => {
  const { sets } = data

  return (
    <div>
      {sets.map((set) => (
        <SetCard key={set._id} set={set} />
      ))}
    </div>
  )
}

export default SetsContent
