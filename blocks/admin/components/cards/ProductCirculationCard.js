import findDataWithId from '@helpers/findDataWithId'
import Card from './Card'

export const ProductCirculationCard = ({
  productCirculation,
  products,
  onClick = () => {},
  onDelete = null,
}) => {
  const product = findDataWithId(products, productCirculation?.productId)

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
      <div className="flex flex-col w-1/12 text-right">
        {productCirculation.purchase ? (
          <div className="flex-1 text-red-700">Продажа</div>
        ) : (
          <div className="flex-1 text-green-700">Закуп</div>
        )}
        <div className="font-bold">
          {productCirculation.count ? productCirculation.count : '0'} шт.
        </div>
      </div>
    </Card>
  )
}

export default ProductCirculationCard
