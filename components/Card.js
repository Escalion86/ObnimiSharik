import Link from 'next/link'

const Button = ({ name, href, active }) => (
  <Link href={href}>
    <a
      className={
        'max-w-40 w-full font-futuraDemi flex justify-center items-center px-4 py-1.5 text-white rounded-xl ' +
        (active ? ' animate-pulse-light bg-toxic' : 'bg-primary')
      }
    >
      {name}
    </a>
  </Link>
)

const CardStandart = ({ card }) => (
  <div className="flex items-center justify-between space-x-1 h-36 max-h-36 w-80">
    <img
      src={card.src}
      alt="catalog_item"
      className="object-contain -mt-4 -mb-5 h-44 w-36"
    />
    <div className="flex flex-col justify-between h-full">
      <div>
        <h4 className="my-1 text-xl leading-tight font-futuraDemi">
          {card.title}
        </h4>
        <p className="text-base font-futura">{card.description}</p>
      </div>
      <Button name="Каталог" href={card.href} active={card.active} />
    </div>
  </div>
)

const CardSmall = ({ card }) => (
  <div
    className="flex flex-col justify-between w-34 h-36 max-h-36"
    style={{ width: '8.25rem' }}
  >
    <div className="flex">
      <div className="flex flex-col h-full mb-6">
        <h4 className="my-1 text-xl font-futuraDemi">{card.title}</h4>
        <p className="text-base font-futura">{card.description}</p>
      </div>
      <img
        src={card.src}
        alt="catalog_item"
        className="object-contain h-24 transform rotate-6"
      />
    </div>
    <Button name="Каталог" href={card.href} active={card.active} />
  </div>
)

const CardBig = ({ card }) => (
  <div className="relative w-80 max-h-88 h-88">
    <div className="absolute z-10 flex flex-col w-56 h-full gap-4 top-2 left-2">
      <div>
        <h4 className="text-xl font-futuraDemi">{card.title}</h4>
        <p className="text-base font-futura">{card.description}</p>
      </div>
      <Button name="Каталог" href={card.href} active={card.active} />
    </div>
    <div
      className="absolute w-60 -bottom-2 -right-2 h-88"
      style={{
        backgroundImage: `url('${card.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundSize: 'contain',
      }}
    />
  </div>
)

const Card = ({ card }) => {
  const { size = 'normal', active = false } = card
  const CardComponent =
    size === 'small' ? CardSmall : size === 'big' ? CardBig : CardStandart
  return (
    <div
      className={
        'px-4 py-5 mb-6 overflow-hidden text-black shadow-light rounded-xl ' +
        (active ? 'bg-red-100' : 'bg-white')
      }
    >
      <CardComponent card={card} />
    </div>
  )
}

export default Card
