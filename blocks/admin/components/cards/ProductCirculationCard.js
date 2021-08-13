import Card from './Card'

export const ProductCirculationCard = ({
  productCirculation,
  onClick = () => {},
  onDelete = null,
}) => (
  <Card>
    {/* <div className="flex-1">
      <div className="flex justify-between space-x-2">
        <div
          className="font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(type)}
        >
          {type.name}
        </div>
      </div>
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{count !== null ? count : '0'} шт.</div>
    </div> */}
  </Card>
)

export default ProductCirculationCard
