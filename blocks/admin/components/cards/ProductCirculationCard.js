import findDataWithId from '@helpers/findDataWithId'
import Card from './Card'

export const ProductCirculationCard = ({
  productCirculation,
  products,
  onClick = () => {},
  onDelete = null,
}) => {
  const { count, purchase, productId } = productCirculation
  const product = findDataWithId(products, productId)

  return (
    <Card>
      <div className="flex-1">
        <div className="flex justify-between space-x-2">
          <div
            className="font-semibold cursor-pointer text-primary hover:text-toxic"
            onClick={() => onClick(productCirculation)}
          >
            {product.name}
          </div>
        </div>
      </div>
      <div
        className={
          'absolute flex justify-center items-center right-0 w-24 h-full text-right rounded-r-lg ' +
          (purchase ? 'bg-red-200' : 'bg-green-200')
        }
      >
        <span>
          <span>{count}</span>
          <span className="text-sm"> шт.</span>
        </span>
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
