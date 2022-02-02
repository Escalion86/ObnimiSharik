import Card from './Card'
import CardButtons from './forCards/CardButtons'
import CardContainer from './CardContainer'

export const DistrictCard = ({
  district,
  onClick = () => {},
  onEdit = null,
  onDelete = null,
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
  hidden = false,
}) => {
  return (
    <Card
      inLine
      onClick={() => onClick(district)}
      onCheckClick={onCheckClick}
      multiselectMode={multiselectMode}
      checked={checked}
      hidden={hidden}
    >
      <div
        className="flex items-center justify-center w-2 text-white duration-500"
        style={{
          backgroundColor: district.svg?.color
            ? '#' + district.svg.color
            : '#9ca3af',
          opacity: 0.5,
        }}
      />
      <CardContainer>
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-x-2 tablet:flex-row">
            <div className="w-5/12 font-semibold min-w-40">{district.name}</div>
          </div>
        </div>
        <div className="px-1 font-bold text-right whitespace-nowrap min-w-min">
          {district.deliveryPrice / 100} ₽
        </div>
      </CardContainer>
      {/* <div className="flex flex-col items-end justify-between"> */}
      <CardButtons onEdit={onEdit} onDelete={onDelete} stretch />
      {/* </div> */}
    </Card>
  )
}

export default DistrictCard