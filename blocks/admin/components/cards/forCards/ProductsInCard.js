import { MenuItem } from '@admincomponents/Menu'
import {
  faCartPlus,
  faFilter,
  faPencilAlt,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@material-ui/core'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup'

const ProductsInCard = ({
  label = 'Товары в наборе',
  productsIdCount = {},
  onEdit = null,
  onFilter = null,
  onBuy = null,
}) => {
  const { products } = useSelector((state) => state)

  const productItems = []
  // let i = 0
  for (const [id, count] of Object.entries(productsIdCount)) {
    productItems.push(({ index }) => {
      const product = products.find((product) => id === product._id)
      if (!product) return null

      return (
        <Tooltip
          title={
            <div className="flex flex-col text-sm">
              <span>{product?.name}</span>
              <span className="text-xs">
                Артикул: {product?.article ? product.article : 'отсутствует'}
              </span>
              <span className="text-xs">
                В наличии: {product?.count ? product.count : '0'} шт.
              </span>
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
                    {product?.name}
                  </span>
                  <span>-</span>
                  <span
                    className={
                      !product?.count || product?.count < count
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
              {/* <div className="flex flex-col px-2 text-sm">
                <span>{product?.name}</span>
                <span className="text-xs">
                  Артикул: {product?.article ? product.article : 'отсутствует'}
                </span>
                <span className="text-xs">
                  В наличии: {product?.count ? product.count : '0'} шт.
                </span>
              </div> */}
              {onEdit && (
                <MenuItem
                  onClick={() => onEdit(product)}
                  icon={faPencilAlt}
                  name="Редактировать товар"
                />
              )}

              {onBuy && (
                <MenuItem
                  onClick={() => onBuy(product)}
                  icon={faCartPlus}
                  name="Купить товар"
                />
              )}
              {onFilter && (
                <MenuItem
                  onClick={() => onFilter(product)}
                  icon={faFilter}
                  name="Показать наборы с этим товаром"
                  disabled
                />
              )}
            </Popup>
          </div>
        </Tooltip>
      )
    })
    // i++
  }

  return (
    <div className="flex mt-1 space-x-2 text-sm">
      <div className="tablet:whitespace-nowrap">{label}:</div>
      {productItems.length > 0 ? (
        <div className="flex flex-wrap gap-x-2">
          {productItems.map((Item, index) => (
            <div key={'ItemRow' + index} className="flex">
              <Item index={index} />
              {index < productItems.length - 1 && <span className="">,</span>}
            </div>
          ))}
        </div>
      ) : (
        <div>отсутствуют</div>
      )}
    </div>
  )
}

export default ProductsInCard
