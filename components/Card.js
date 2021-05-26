import Link from 'next/link'

const Button = ({ name, href }) => (
  <Link href={href}>
    <a className="max-w-40 w-full font-futuraDemi flex justify-center items-center px-4 py-1.5 text-white bg-primary rounded-xl">
      {name}
    </a>
  </Link>
)

const CardStandart = ({ src, title = '', desc, href }) => (
  <div className="flex items-center justify-between h-48 px-4 mb-4 space-x-1 overflow-hidden text-black max-h-48 shadow-light rounded-xl w-90">
    <img src={src} alt="catalog_item" className="object-contain h-40 w-36" />
    <div className="flex flex-col justify-between h-full py-5">
      <div>
        <h4 className="my-1 text-xl leading-tight font-futuraDemi">{title}</h4>
        {desc.map((descItem) => (
          <p className="text-base font-futura">{descItem}</p>
        ))}
      </div>
      <Button name="Каталог" href={href} />
    </div>
  </div>
)

const CardSmall = ({ src, title = '', desc, href }) => (
  <div className="flex flex-col justify-between w-40 h-48 px-4 py-5 mb-4 overflow-hidden text-black max-h-48 shadow-light rounded-xl">
    <div className="flex">
      <div className="flex flex-col h-full mb-6">
        <h4 className="my-1 text-xl font-futuraDemi">{title}</h4>
        {desc.map((descItem) => (
          <p className="text-base font-futura">{descItem}</p>
        ))}
      </div>
      <img
        src={src}
        alt="catalog_item"
        className="object-contain h-24 transform rotate-6"
      />
    </div>
    <Button name="Каталог" href={href} />
  </div>
)

const CardBig = ({ src, title = '', desc, href }) => (
  <div className="relative px-4 mb-4 overflow-hidden text-black shadow-light rounded-xl w-90 max-h-100 h-100">
    <div className="absolute z-10 flex flex-col w-56 h-full gap-4 top-4 left-4">
      <div>
        <h4 className="text-xl font-futuraDemi">{title}</h4>
        {desc.map((descItem) => (
          <p className="text-base font-futura">{descItem}</p>
        ))}
      </div>
      <Button name="Каталог" href={href} />
    </div>
    <div
      className="absolute w-64 bottom-2 right-2 h-88"
      style={{
        backgroundImage: `url('${src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundSize: 'contain',
      }}
    />
    {/* <img
      src={src}
      alt="catalog_item"
      className="absolute object-contain w-60 bottom-2 right-2 h-80"
      align="right"
    /> */}
  </div>
)

const Card = ({ src, title = '', desc, href, small = false, big = false }) => {
  const CardType = small ? CardSmall : big ? CardBig : CardStandart

  return (
    // <div className="flex justify-center mb-4">
    <CardType src={src} title={title} desc={desc} href={href} />
    // </div>
  )
}

export default Card
