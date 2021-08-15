import Card from './Card'

export const TypeCard = ({
  type,
  count = null,
  onClick = () => {},
  onDelete = null,
}) => (
  <Card>
    <div className="flex-1">
      <div className="flex justify-between gap-x-2">
        <div
          className="font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(type)}
        >
          {type.name}
        </div>
        {/* <div className="flex-1 italic">{type.description}</div> */}
      </div>
    </div>
    <div className="w-20 text-right">
      <span>
        <span>{count}</span>
        <span className="text-sm"> шт.</span>
      </span>
      {/* <div className="font-bold">{count !== null ? count : '0'} шт.</div> */}
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </Card>
)

export default TypeCard
