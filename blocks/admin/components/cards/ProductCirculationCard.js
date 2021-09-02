import CardButton from '@admincomponents/cards/forCards/CardButton'
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import findDataWithId from '@helpers/findDataWithId'
import formatDate from '@helpers/formatDate'
import { useSelector } from 'react-redux'
import Card from './Card'
import CardContainer from './CardContainer'
import CardButtons from './forCards/CardButtons'

export const ProductCirculationCard = ({
  productCirculation,
  onClick = () => {},
  onDelete = null,
  onEdit = null,
  onAdd = null,
}) => {
  const { count, purchase, productId } = productCirculation
  const { products } = useSelector((state) => state)
  const product = findDataWithId(products, productId)
  // if (!product) return <Card>?</Card>
  return (
    <Card inLine onClick={() => onClick(productCirculation)}>
      <CardContainer>
        <div className="flex-1 mr-24">
          <div className="flex flex-col flex-wrap tablet:items-center gap-x-2 tablet:flex-row">
            <div>{formatDate(productCirculation.purchasedAt)}</div>
            <div className="font-semibold">
              {product ? product.name : '? [товар не найден в базе]'}
            </div>
          </div>
        </div>
      </CardContainer>
      <div
        className={
          'flex justify-center items-center w-20 h-full ' +
          (purchase ? 'bg-red-200' : 'bg-green-200')
        }
      >
        <span>
          <span>{count}</span>
          <span className="text-sm"> шт.</span>
        </span>
      </div>
      <CardButtons onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
      {/* <div
      className={
        'absolute bottom-0 right-0 flex items-center justify-center w-24 h-10 border-t border-l border-gray-300 rounded-tl-lg rounded-br-lg ' +
        (count > 3
          ? 'bg-green-400'
          : count > 0
          ? 'bg-green-200'
          : count < 0
          ? 'bg-red-400'
          : 'bg-red-200')
      }
    >
      <span>
        <span>{count}</span>
        <span className="text-sm"> шт.</span>
      </span>
    </div> */}
    </Card>
  )
}

export default ProductCirculationCard
