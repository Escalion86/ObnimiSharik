import { Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux'

const SetsInCard = ({ label = 'Наборы', setsIdCount = {}, onClick = null }) => {
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
              className="flex cursor-pointer group"
              onClick={
                onClick
                  ? (event) => {
                      event.stopPropagation()
                      onClick(set)
                    }
                  : null
              }
            >
              <div
                className={
                  'group-hover:text-toxic flex-1 ' +
                  // (onClick
                  //   ? !product?.count || product?.count < count
                  //     ? 'text-red-400'
                  //     : 'text-primary'
                  //   : '')
                  (onClick ? 'text-primary' : '')
                }
              >
                {/* {product.article && '(' + product.article + ') '} */}
                {set?.name}
              </div>
              <div className="ml-1 flex flex-nowrap gap-x-0.5 group-hover:text-toxic">
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
