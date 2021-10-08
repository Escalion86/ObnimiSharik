import { Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux'

const ProductsInCard = ({
  label = 'Товары в наборе',
  productsIdCount = {},
  onClick = null,
}) => {
  const { products } = useSelector((state) => state)

  const productItems = []
  // let i = 0
  for (const [id, count] of Object.entries(productsIdCount)) {
    productItems.push(({ index }) => {
      const product = products.find((product) => id === product._id)
      if (!product) return null

      return (
        <div className="flex" key={'product' + id}>
          <Tooltip
            title={
              <div className="text-xs">
                {product?.name}
                <br />
                Артикул:{' '}
                {product?.article ? '(' + product.article + ')' : 'отсутствует'}
                <br />В наличии: {product?.count ? product.count : '0'} шт.
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
                      onClick(product)
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
                {product?.name}
              </div>
              <div className="ml-1 flex flex-nowrap gap-x-0.5 group-hover:text-toxic">
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
