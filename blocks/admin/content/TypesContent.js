import React, { useState } from 'react'

const TypeCard = ({ type }) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white shadow-md">
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic">
          {type.name}
        </div>
        <div className="flex-1 italic">{type.description}</div>
      </div>
    </div>
  </div>
)

const TypesContent = ({ data }) => {
  console.log(`data.types`, data.types)
  const { types } = data

  return (
    <div className="h-screen">
      {types.map((type) => (
        <TypeCard key={type._id} type={type} />
      ))}
    </div>
  )
}

export default TypesContent
