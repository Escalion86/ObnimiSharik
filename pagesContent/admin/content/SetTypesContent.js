import { TypeCard } from '@admincomponents/cards'
import { DEFAULT_SET } from '@helpers/constants'
import Content from './Content'

const SetTypesContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.setTypes

  return (
    <Content
      data={data}
      itemContent={(index, setType) => (
        <TypeCard
          key={setType._id}
          type={setType}
          loggedUser={loggedUser}
          onClick={() => modals.openSetTypeModal(setType)}
          onAdd={
            loggedUser.access.sets.add
              ? () =>
                  modals.openSetModal({
                    ...DEFAULT_SET,
                    typesId: [setType._id],
                  })
              : null
          }
          onEdit={
            accessToContent.edit(setType)
              ? () => modals.openSetTypeModal(setType, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(setType)
              ? () => modals.openDeleteSetType(setType)
              : null
          }
        />
      )}
      onFabClick={accessToContent.add ? () => modals.openSetTypeModal() : null}
      messageIfNoData="Типов наборов нет"
    />
  )
}

export default SetTypesContent
