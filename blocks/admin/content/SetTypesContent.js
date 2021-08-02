import React from 'react'
import { TypeCard } from '@admincomponents/Cards'
import SetTypeModal from '@adminblocks/modals/SetTypeModal'
import { fetchingSetTypes } from '@helpers/fetchers'

const SetTypesContent = ({
  data,
  setModal = () => {},
  updateData = () => {},
}) => {
  const { setTypes, sets } = data
  return (
    <div>
      {setTypes.map((settype) => {
        const count = sets.filter((set) =>
          set.typesId.includes(settype._id)
        ).length
        return (
          <TypeCard
            key={settype._id}
            type={settype}
            count={count}
            onClick={() =>
              setModal(() => (
                <SetTypeModal
                  settype={settype}
                  onClose={() => setModal(null)}
                  afterConfirm={() => fetchingSetTypes(updateData)}
                />
              ))
            }
          />
        )
      })}
    </div>
  )
}

export default SetTypesContent
