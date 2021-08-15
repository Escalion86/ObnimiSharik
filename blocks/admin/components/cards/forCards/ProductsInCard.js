import { Tooltip } from '@material-ui/core'

const ProductsInCard = ({ productsIdCount, productsWithCount, onClick }) => {
  if (productsIdCount[0] === undefined) productsIdCount.length = 0
  return (
    <div className="flex mt-1 space-x-2 text-sm">
      <div className="min-w-max">Товары в наборе:</div>
      {productsIdCount.length > 0 ? (
        <div className="flex flex-wrap gap-x-2">
          {productsIdCount.map((productIdCount, index) => {
            const product = productsWithCount.find(
              (product) => productIdCount.id === product._id
            )
            return (
              <div className="flex" key={'product' + productIdCount?.id}>
                <Tooltip
                  title={
                    <div className="text-xs">
                      Артикул:{' '}
                      {product.article
                        ? '(' + product.article + ')'
                        : 'отсутствует'}
                      <br />В наличии: {product.count} шт.
                    </div>
                  }
                  arrow
                  placement="top"
                >
                  <div className="flex">
                    <div
                      className="cursor-pointer text-primary hover:text-toxic"
                      onClick={() => onClick(product)}
                    >
                      {/* {product.article && '(' + product.article + ') '} */}
                      {product.name}
                    </div>
                    <div className="ml-1">
                      -{' '}
                      <span
                        className={
                          !product.count || product.count < productIdCount.count
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
        </div>
      ) : (
        <div>отсутствуют</div>
      )}
    </div>
  )
}

export default ProductsInCard
