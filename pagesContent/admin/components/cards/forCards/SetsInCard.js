import MenuItem from '@admincomponents/MenuItem'
import {
  faCartPlus,
  faFilter,
  faPencilAlt,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup'

const SetsInCard = ({
  label = 'Наборы',
  setsIdCount = {},
  onEdit = null,
  onFilter = null,
}) => {
  const { sets } = useSelector((state) => state)

  const setItems = []
  // let i = 0
  for (const [id, count] of Object.entries(setsIdCount)) {
    setItems.push(({ index }) => {
      const set = sets.find((set) => id === set._id)
      if (!set) return null

      return (
        <div className="flex" key={'set' + id}>
          <Tooltip
            title={
              <div className="text-xs">
                {set?.name}
                <br />
                Артикул:{' '}
                {set?.article ? '(' + set.article + ')' : 'отсутствует'}
                <br />В наличии: {set?.count ? set.count : '0'} шт.
              </div>
            }
            arrow
            placement="top"
          >
            <div
              className="flex"
              key={'product' + id}
              onClick={(event) => {
                event.stopPropagation()
                // onClick(product)
              }}
            >
              <Popup
                trigger={
                  <div className="ml-1 flex flex-nowrap gap-x-0.5 group-hover:text-toxic">
                    <span className="flex-1 group-hover:text-toxic text-primary">
                      {set?.name}
                    </span>
                    <span>-</span>
                    <span
                      className={
                        !set?.count || set?.count < count
                          ? 'text-red-400 font-bold'
                          : 'text-black'
                      }
                    >
                      {count}
                    </span>
                    <span>шт</span>
                  </div>
                }
                // position="right top"
                // on="hover"
                closeOnDocumentClick
                // mouseLeaveDelay={300}
                // mouseEnterDelay={0}
                contentStyle={{
                  padding: '0px',
                  // border: '1px',
                  borderColor: 'rgb(38, 163, 212)',
                  width: 'auto',
                }}
                arrow={false}
                nested
              >
                {onEdit && typeof onEdit(set) === 'function' && (
                  <MenuItem
                    onClick={() => onEdit(set)()}
                    icon={faPencilAlt}
                    name="Редактировать набор"
                  />
                )}
                {onFilter && (
                  <MenuItem
                    onClick={() => onFilter(set)}
                    icon={faFilter}
                    name="Показать заказы с этим набором"
                    disabled
                  />
                )}
              </Popup>
            </div>
          </Tooltip>
        </div>
      )
    })
    // i++
  }

  return (
    <div className="flex mt-1 space-x-2 text-sm">
      <div className="tablet:whitespace-nowrap">{label}:</div>
      {setItems.length > 0 ? (
        <div className="flex flex-wrap gap-x-2">
          {setItems.map((Item, index) => (
            <Item key={'ItemRow' + index} index={index} />
          ))}
        </div>
      ) : (
        <div>отсутствуют</div>
      )}
    </div>
  )
}

export default SetsInCard
