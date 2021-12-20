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
          onClick={() => modals.devToDo.open(devToDo)}
          onEdit={
            accessToContent.edit(devToDo)
              ? () => modals.devToDo.open(devToDo, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(devToDo)
              ? () => modals.devToDo.delete(devToDo)
              : null
          }
        />
      )}
      onFabClick={accessToContent.add ? () => modals.devToDo.open() : null}
      messageIfNoData="Заявок разработчику нет"
    />
  )
}

export default DevToDoContent
