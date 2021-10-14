import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'
import { PRIORITIES } from '@helpers/constants'

export const DevToDoCard = ({
  devToDo,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
}) => {
  return (
    <Card inLine onClick={() => onClick(devToDo)}>
      <div
        className={
          'w-2 rounded-l-lg bg-' +
            PRIORITIES.find(
              (priorityItem) => priorityItem.value === devToDo.priority
            )?.color ?? 'gray-400'
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
      <CardButtons onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

export default DevToDoCard
