import React from 'react'
import SetModal from '../modals/SetModal'
import { fetchingSets } from '@helpers/fetchers'
import { SetCard } from '@admincomponents/Cards'

const SetsContent = ({ data, setModal = () => {}, updateData = () => {} }) => {
  const { sets } = data

  return (
    // <div>
    //   {sets.map((set) => (
    //     <SetCard key={set._id} set={set} />
    //   ))}
    // </div>
    <>
      {sets.map((set) => {
        const types = set.typesId.map((type_id) =>
          data.setTypes.find((typeCheck) => typeCheck._id === type_id)
        )
        if (types[0] === undefined) types.length = 0
        return (
          <SetCard
            key={set._id}
            set={{ ...set, types }}
            onClick={() =>
              setModal(() => (
                <SetModal
                  set={set}
                  setTypes={data.setTypes}
                  onClose={() => setModal(null)}
                  afterConfirm={() => fetchingSets(updateData)}
                />
              ))
            }
            onTypeClick={(type) => console.log(`type`, type)}
          />
        )
      })}
    </>
  )
}

export default SetsContent
