import { TypeCard } from '@admincomponents/cards'
import { DEFAULT_SET } from '@helpers/constants'
import Content from './Content'

const SetTypesContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.setTypes

  return (
    <Content
      data={data}
      itemContent={(index, setType) => {
        const checked = selectedItems.find((item) => item._id === setType._id)
        return (
          <TypeCard
            key={setType._id}
            type={setType}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== setType._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== setType._id
                            ),
                            setType,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.setTypes.open(setType)}
            onAdd={
              loggedUser.access.sets.add
                ? () =>
                    modals.sets.open({
                      ...DEFAULT_SET,
                      typesId: [setType._id],
                    })
                : null
            }
            onEdit={
              accessToContent.edit(setType)
                ? () => modals.setTypes.open(setType, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(setType)
                ? () => modals.setTypes.delete(setType)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.setTypes.open() : null}
      messageIfNoData="Типов наборов нет"
    />
  )
}

export default SetTypesContent
