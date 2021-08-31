import { Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux'

const ProductsInCard = ({ productsIdCount = {}, onClick = null }) => {
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
            <div className="flex">
              <div
                className={
                  onClick
                    ? 'cursor-pointer hover:text-toxic ' +
                      (!product?.count || product?.count < count
                        ? 'text-red-400'
                        : 'text-primary')
                    : ''
                }
                onClick={onClick ? () => onClick(product) : null}
              >
                {/* {product.article && '(' + product.article + ') '} */}
                {product?.name}
              </div>
              <div className="ml-1">
                {'- '}
                <span
                  className={
                    !product?.count || product?.count < count
                      ? 'text-red-400'
                      : 'text-black'
                  }
                >
                  {count}
                </span>{' '}
                шт
              </div>
            </div>
          </Tooltip>
          {/* {index < productsIdCount.length - 1 ? (
            <div className="mr-1">, </div>
          ) : (
            ''
          )} */}
        </div>
      )
    })
    // i++
  }

  return (
    <div className="flex mt-1 space-x-2 text-sm">
      <div className="min-w-max">Товары в наборе:</div>
      {productItems.length > 0 ? (
        <div className="flex flex-wrap gap-x-2">
          {productItems.map((Item, index) => (
            <Item key={'ItemRow' + index} index={index} />
          ))}
          {/* 

          {productsIdCount.map((productIdCount, index) => {
            const product = products.find(
              (product) => productIdCount.id === product._id
            )
            if (!product) return null
            return (
              <div className="flex" key={'product' + productIdCount?.id}>
                <Tooltip
                  title={
                    <div className="text-xs">
                      {product?.name}
                      <br />
                      Артикул:{' '}
                      {product?.article
                        ? '(' + product.article + ')'
                        : 'отсутствует'}
                      <br />В наличии: {product?.count ? product.count : '0'}{' '}
                      шт.
                    </div>
                  }
                  arrow
                  placement="top"
                >
                  <div className="flex">
                    <div
                      className={
                        onClick
                          ? 'cursor-pointer hover:text-toxic ' +
                            (!product?.count ||
                            product?.count < productIdCount.count
                              ? 'text-red-400'
                              : 'text-primary')
                          : ''
                      }
                      onClick={onClick ? () => onClick(product) : null}
                    >
                      {product?.name}
                    </div>
                    <div className="ml-1">
                      {'- '}
                      <span
                        className={
                          !product?.count ||
                          product?.count < productIdCount.count
                            ? 'text-red-400'
                            : 'text-black'
                        }
                      >
                        {productIdCount.count}
                      </span>{' '}
                      шт
                    </div>
                  </div>
                </Tooltip>
                {index < productsIdCount.length - 1 ? (
                  <div className="mr-1">, </div>
                ) : (
                  ''
                )}
              </div>
            )
          })}


           */}
        </div>
      ) : (
        <div>отсутствуют</div>
      )}
    </div>
  )
}

export default ProductsInCard
