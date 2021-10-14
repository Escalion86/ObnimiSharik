import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import { DEVTODO_STATUSES, PRIORITIES } from '@helpers/constants'

export const DevToDoCard = ({
  devToDo,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  const devStatus = DEVTODO_STATUSES.find(
    (item) => item.value === devToDo.status
  )
  const priority = PRIORITIES.find(
    (priorityItem) => priorityItem.value === devToDo.priority
  )
  return (
    <Card inLine onClick={() => onClick(devToDo)}>
      <div
        className={
          'w-2 rounded-l-lg bg-' +
          (priority ? priority.color + '-400' : 'gray-400')
        }
      />
      <CardContainer className="items-center">
        <div className="items-center flex-1">
          <div className="flex flex-col flex-wrap justify-between gap-x-4 phoneH:flex-row">
            <div className="font-semibold">{devToDo.title}</div>
            <div className="flex-1 italic">{devToDo.description}</div>
          </div>
        </div>
      </CardContainer>
      <div
        className={
          'flex justify-center items-center w-24 h-full bg-' +
          devStatus.color +
          '-400'
        }
      >
        <span>
          <span className="text-sm text-gray-800">{devStatus.name}</span>
        </span>
      </div>
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default DevToDoCard
