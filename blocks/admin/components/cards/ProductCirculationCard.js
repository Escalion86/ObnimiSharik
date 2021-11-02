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
  onClone = null,
}) => {
  const { count, purchase, productId } = productCirculation
  const { products } = useSelector((state) => state)
  const product = findDataWithId(products, productId)
  // if (!product) return <Card>?</Card>
  return (
    <Card inLine onClick={() => onClick(productCirculation)}>
      <CardContainer>
        <div className="flex flex-col flex-wrap flex-1 tablet:items-center gap-x-2 tablet:flex-row">
          <div>{formatDate(productCirculation.purchasedAt)}</div>
          <div className="flex-1 font-semibold">
            {product ? product.name : '? [товар не найден в базе]'}
          </div>
          {productCirculation.defective && (
            <div className="font-bold text-red-700">Брак</div>
          )}
          <div className="hidden font-bold whitespace-nowrap laptop:block">
            {productCirculation.price / 100} ₽
          </div>
        </div>
      </CardContainer>
      <div className="flex flex-col-reverse items-end justify-between gap-y-1 laptop:flex-row laptop:items-center">
        <div
          className={
            'flex justify-center rounded-tl-lg laptop:rounded-none laptop:h-full px-1 py-0.5 items-center min-w-24 ' +
            (purchase ? 'bg-red-200' : 'bg-green-200')
          }
        >
          <span className="text-sm text-gray-800">
            {`${count}  шт. по ${
              Math.round(productCirculation.price / productCirculation.count) /
              100
            } ₽`}
          </span>
        </div>
        <div className="font-bold whitespace-nowrap laptop:hidden">
          {productCirculation.price / 100} ₽
        </div>
        <CardButtons onEdit={onEdit} onDelete={onDelete} onClone={onClone} />
      </div>
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
