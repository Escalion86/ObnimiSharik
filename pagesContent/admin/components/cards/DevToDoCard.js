import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import { DEVTODO_STATUSES, PRIORITIES } from '@helpers/constants'
import { useSelector } from 'react-redux'
import cn from 'classnames'

export const DevToDoCard = ({
  devToDo,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
  hidden = false,
}) => {
  const { users } = useSelector((state) => state)

  const user = users.find((user) => user._id === devToDo.userId)

  const devStatus = DEVTODO_STATUSES.find(
    (item) => item.value === devToDo.status
  )
  const priority = PRIORITIES.find(
    (priorityItem) => priorityItem.value === devToDo.priority
  )
  return (
    <Card onClick={() => onClick(devToDo)} hidden={hidden}>
      <div className={cn('w-2', 'bg-' + (priority.color ?? 'gray-400'))} />
      <CardContainer className="items-center">
        <div className="items-center flex-1">
          <div className="flex flex-col gap-y-1">
            <div className="font-semibold">{devToDo.title}</div>
            <div className="flex-1 italic whitespace-pre-line">
              {devToDo.description}
            </div>
            {user ? (
              <div className="flex-1">
                Создано: <span className="italic">{user.name}</span>
              </div>
            ) : null}
          </div>
        </div>
      </CardContainer>

      <div className="flex flex-col-reverse items-end justify-between gap-y-1">
        <div
          className={cn(
            'flex justify-center rounded-tl-lg py-0.5 items-center w-24',
            'bg-' + devStatus.color
          )}
        >
          <span>
            <span className="text-sm text-gray-800">{devStatus.name}</span>
          </span>
        </div>
        <CardButtons onEdit={onEdit} onDelete={onDelete} topRight />
      </div>
    </Card>
  )
}

export default DevToDoCard
