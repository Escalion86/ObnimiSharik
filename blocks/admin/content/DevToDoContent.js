import { DevToDoCard } from '@admincomponents/cards'
import Content from './Content'

const DevToDoContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.devToDo

  return (
    <Content
      data={data}
      itemContent={(index, devToDo) => (
        <DevToDoCard
          key={devToDo._id}
          devToDo={devToDo}
          loggedUser={loggedUser}
          onClick={() => modals.openDevToDoModal(devToDo)}
          onEdit={
            accessToContent.edit(devToDo)
              ? () => modals.openDevToDoModal(devToDo, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(devToDo)
              ? () => modals.openDeleteDevToDo(devToDo)
              : null
          }
        />
      )}
      onFabClick={accessToContent.add ? () => modals.openDevToDoModal() : null}
      messageIfNoData="Заявок разработчику нет"
    />
  )
}

export default DevToDoContent
