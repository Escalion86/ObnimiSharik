import Block from '../components/Block'
import MainLayout from '../components/MainLayout'
import Link from 'next/link'
// const background = require('../public/img/bg.jpg')

const HorizontalSeparator = ({ white = true }) => (
  <div className={'w-12 h-2 my-6 ' + (white ? 'bg-white' : 'bg-gray-600')} />
)

const Title = ({ title, white = false, small = false }) => (
  <div>
    <h3
      className={
        'font-futuraDemi ' +
        (small ? 'text-4xl' : 'text-5xl') +
        (white ? '' : ' text-gray-600')
      }
    >
      {title}
    </h3>
    <HorizontalSeparator white={white} />
  </div>
)

const SpecialCard = ({ src }) => (
  <img
    src={src}
    alt="special"
    className="w-48 shadow-sm rounded-xl cursor-zoom-in"
  />
)

const CatalogCardStandart = ({ src, title = '', desc, href }) => (
  <div className="flex px-5 mb-20 text-black shadow-light rounded-xl w-90">
    <img src={src} alt="catalog_item" className="h-40" />
    <div className="flex flex-col h-full mb-6 ml-5">
      <h4 className="mb-1 text-xl font-futuraDemi">{title}</h4>
      <p className="text-lg leading-tight font-futura">{desc}</p>
      <Link href={href}>
        <a className="w-full font-futuraDemi mt-6 flex justify-center items-center px-4 py-1.5 text-white bg-primary rounded-xl">
          Каталог
        </a>
      </Link>
    </div>
  </div>
)

const CatalogCardSmall = ({ src, title = '', desc, href }) => (
  <div className="w-40 px-5 mb-20 text-black flexflex-column shadow-light rounded-xl">
    <div className="flex">
      <div className="flex flex-col h-full mb-6">
        <h4 className="mb-1 text-xl font-futuraDemi">{title}</h4>
        <p className="text-lg leading-tight font-futura">{desc}</p>
      </div>
      <img src={src} alt="catalog_item" className="h-24 transform rotate-6" />
    </div>
    <Link href={href}>
      <a className="w-full font-futuraDemi flex justify-center items-center px-4 py-1.5 text-white bg-primary rounded-xl">
        Каталог
      </a>
    </Link>
  </div>
)

const CatalogCardBig = ({ src, title = '', desc, href }) => (
  <div className="flex px-5 mb-20 text-black shadow-light rounded-xl w-90">
    <img src={src} alt="catalog_item" height={162} />
    <div className="flex flex-col h-full mb-6 ml-5">
      <h4 className="text-xl font-futuraDemi">{title}</h4>
      <p className="text-lg font-futura">{desc}</p>
      <Link href={href}>
        <a className="w-full font-futuraDemi mt-4 flex justify-center items-center px-4 py-1.5 text-white bg-primary rounded-xl">
          Каталог
        </a>
      </Link>
    </div>
  </div>
)

const CatalogCard = ({
  src,
  title = '',
  desc,
  href,
  small = false,
  big = false,
}) => {
  const Catalog = small
    ? CatalogCardSmall
    : big
    ? CatalogCardBig
    : CatalogCardStandart

  return <Catalog src={src} title={title} desc={desc} href={href} />
}

export default function Home() {
  return (
    <MainLayout title="Обними шарик - Главная">
      <div
        className="flex flex-col bg-white"
        style={{
          backgroundImage: `url('img/bg.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          width: '100%',
          height: '1120px',
        }}
      >
        <div className="w-full h-20" />
        <div className="absolute bottom-0 w-full bg-white h-80" />
        <Block className="z-10 w-full mt-40">
          <div className="font-futuraDemi">
            <span className="text-6xl text-yellow-300">Доставляем</span>
            <span className="text-5xl"> красивые шарики</span>
            <br />
            <span className="text-4xl">всех цветов и форм</span>
            <span className="text-5xl text-yellow-300"> по Красноярску</span>
          </div>
          <HorizontalSeparator white />
          <div className="flex items-center">
            <div className="text-xl">
              Подарим шарик с гелием
              <br />
              за ответ на 3 простых вопроса
            </div>
            <div className="relative ml-6 font-futuraDemi">
              <button className="py-2 text-2xl bg-white border border-white shadow animate-pulse-light px-9 rounded-2xl text-primary">
                Получить шарик
              </button>
              <div className="absolute -right-18 -top-7">
                <img src="img/1.png" alt="balloon" width={115} height={134} />
                <div className="absolute text-lg transform top-8 left-8 text-third -rotate-15">
                  30 см
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 pt-6 pb-8 bg-white shadow-medium rounded-2xl mt-52">
            <Title title="Акции и скидки" small />
            <div className="flex justify-between">
              <SpecialCard src="img/special/1.png" />
              <SpecialCard src="img/special/2.png" />
              <SpecialCard src="img/special/3.png" />
              <SpecialCard src="img/special/4.png" />
              <SpecialCard src="img/special/5.png" />
            </div>
          </div>
          <div className="mt-36">
            <Title title="Каталог шаров" />
            <div className="flex flex-wrap justify-center space-x-5">
              <CatalogCard
                title="Обычные шарики"
                desc="большой выбор, в наличии все цвета"
                href="/"
                src="img/catalog/standart.webp"
              />
              <CatalogCard
                title="Шарики с рисунком"
                desc="большой выбор на любой праздник"
                href="/"
                src="img/catalog/withpicture.webp"
              />
              <CatalogCard
                title="Цифры"
                desc="большой выбор"
                href="/"
                src="img/catalog/numbers.webp"
                small
              />
              <CatalogCard
                title="Фигуры"
                desc="большой выбор"
                href="/"
                src="img/catalog/figures.png"
                small
              />
            </div>
          </div>
        </Block>
      </div>
    </MainLayout>
  )
}
