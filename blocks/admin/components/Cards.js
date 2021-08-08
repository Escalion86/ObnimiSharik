import TypesInCard from '@admincomponents/TypesInCard'
import ImageZoom from 'react-medium-image-zoom'
import roleRus from '@helpers/roleRus'
import ProductsInCard from './ProductsInCard'

const Card = ({ children }) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white rounded-lg shadow-medium ">
    {children}
  </div>
)

export const SetCard = ({
  set,
  products,
  onClick = () => {},
  onTypeClick = () => {},
  onProductClick = () => {},
  onDelete = null,
}) => (
  <Card>
    {set.images[0] ? (
      <ImageZoom
        image={{
          src: set.images[0],
          alt: 'set',
          className: 'w-14 h-14',
          // style: { width: '50em' }
        }}
        zoomImage={{
          src: set.images[0],
          alt: 'set',
        }}
      />
    ) : (
      <img className="w-14 h-14" src="/img/no_image.png" alt="set" />
    )}
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div
          className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(set)}
        >
          {set.name}
        </div>
        <div className="flex-1 text-sm italic">{set.description}</div>
      </div>
      <ProductsInCard
        productsIdCount={set.productsIdCount}
        products={products}
        onClick={onProductClick}
      />
      <TypesInCard types={set.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{set.price / 100} ₽</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </Card>
)

export const ProductCard = ({
  product,
  onClick = () => {},
  onTypeClick = () => {},
  onDelete = null,
}) => (
  <Card>
    {/* <img
      className="w-14 h-14"
      src={product.images[0]}
      alt="product"
      width={56}
      height={56}
    /> */}
    {product.images[0] ? (
      <ImageZoom
        image={{
          src: product.images[0],
          alt: 'product',
          className: 'w-14 h-14',
          // style: { width: '50em' }
        }}
        zoomImage={{
          src: product.images[0],
          alt: 'product',
        }}
      />
    ) : (
      <img className="w-14 h-14" src="/img/no_image.png" alt="product" />
    )}
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div
          className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(product)}
        >
          {product.name}
        </div>
        <div className="flex-1 text-sm italic">{product.description}</div>
      </div>
      <TypesInCard types={product.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{product.price / 100} ₽</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </Card>
)

export const TypeCard = ({
  onClick = () => {},
  type,
  count = null,
  onDelete = null,
}) => (
  <Card>
    <div className="flex-1">
      <div className="flex justify-between space-x-2">
        <div
          className="font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(type)}
        >
          {type.name}
        </div>
        {/* <div className="flex-1 italic">{type.description}</div> */}
      </div>
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{count !== null ? count : '0'} шт.</div>
      {/* <div className="">{products.price} ₽</div> */}
    </div>
  </Card>
)

export const InvitationCard = ({
  invitation,
  onClick = () => {},
  onDelete = null,
}) => {
  let status
  switch (invitation.status) {
    case 'created':
      status = 'Создано'
      break
    // case 'sended':
    //   status = 'Отправлено'
    //   break
    case 'confirmed':
      status = 'Принято'
      break
    default:
      status = '?'
      break
  }

  return (
    <Card>
      <div className="flex-1">
        <div className="flex justify-between space-x-4">
          <div
            className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
            onClick={() => onClick(invitation)}
          >
            {invitation.email}
          </div>
          <div className="flex-1 italic">{roleRus(invitation.role)}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{status}</div>
      </div>
    </Card>
  )
}

export const UserCard = ({ user }) => (
  <Card>
    <div className="flex-1">
      <div className="flex justify-between space-x-4">
        <div
          className="font-semibold"
          // onClick={() => onClick(invitation)}
        >
          {user.name}
        </div>
        <div className="flex-1 italic">{user.email}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-bold">{roleRus(user.role)}</div>
    </div>
  </Card>
)

export default Card
