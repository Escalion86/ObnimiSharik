import Block from '../components/Block'
import MainLayout from '../components/MainLayout'
import Link from 'next/link'
// const background = require('../public/img/bg.jpg')
import Title from '../components/Title'
import HorizontalSeparator from '../components/HorizontalSeparator'
import Card from '../components/Card'
import BlockOfCards from '../components/BlockOfCards'

const catalogData = [
  {
    title: 'Обычные шарики',
    desc: ['большой выбор, в наличии все цвета'],
    href: '/',
    src: 'img/catalog/standart.webp',
    size: 'normal',
  },
  {
    title: 'Шарики с рисунком',
    desc: ['большой выбор на любой праздник'],
    href: '/',
    src: 'img/catalog/withpicture.webp',
    size: 'normal',
  },
  {
    title: 'Цифры',
    desc: ['большой выбор'],
    href: '/',
    src: 'img/catalog/numbers.webp',
    size: 'small',
  },
  {
    title: 'Фигуры',
    desc: ['большой выбор'],
    href: '/',
    src: 'img/catalog/figures.png',
    size: 'small',
  },
]

const setsData = [
  {
    title: 'Для ребенка',
    desc: ['- Мульт. персонаж', '- Скидка в день рождения'],
    href: '/',
    src: 'img/set/forkids.webp',
    size: 'normal',
  },
  {
    title: 'Для девушки',
    desc: ['- С перьями, конфети', '- Надпись на шарике'],
    href: '/',
    src: 'img/set/forgirl.webp',
    size: 'normal',
  },
  {
    title: 'Для парня/мужчины',
    desc: ['- Красивые композиции', '- Надписьна шарике'],
    href: '/',
    src: 'img/set/forboys.webp',
    size: 'normal',
  },
  {
    title: 'Gender Party',
    desc: ['- Шары с сухой краской', '- Шарики внутри шара'],
    href: '/',
    src: 'img/set/forgenderparty.png',
    size: 'normal',
  },
  {
    title: 'На выписку',
    desc: ['- Для мальчика и девочки'],
    href: '/',
    src: 'img/set/forborn.webp',
    size: 'normal',
  },
  {
    title: 'Большие подарочные коробки с шарами',
    desc: [
      '- Коробки 60*60*60 см',
      '- Цвета на выбор',
      '- Индивидуальная надпись',
    ],
    href: '/',
    src: 'img/set/boxes.webp',
    size: 'big',
  },
  {
    title: 'Гигантские прозрачные шары Bubbles',
    desc: [
      '- Шары размером 46, 51 и 81 см',
      '- Наполнение перьями, конфети',
      '- Украшение лентами',
    ],
    href: '/',
    src: 'img/set/gigant.webp',
    size: 'big',
  },
  {
    title: 'Для мамы и папы',
    desc: ['- На юбилей и годовщину', '- Надпись на шарике'],
    href: '/',
    src: 'img/set/forparents.webp',
    size: 'normal',
  },
  {
    title: 'Для молодоженов',
    desc: ['- Красивые композиции', '- Надпись на шарике'],
    href: '/',
    src: 'img/set/forwedding.webp',
    size: 'normal',
  },
  {
    title: 'Дарим шарик с гелием',
    desc: ['за ответ на 3 вопроса'],
    href: '/',
    src: 'img/30sm.png',
    size: 'normal',
    active: true,
  },
]

const SpecialCard = ({ src }) => (
  <img
    src={src}
    alt="special"
    className="w-48 shadow-sm rounded-xl cursor-zoom-in"
  />
)

const Button = ({ name, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={
      'h-12 py-2 text-2xl bg-white border border-white shadow font-futuraDemi animate-pulse-light px-9 rounded-2xl text-primary' +
      (className ? ' ' + className : '')
    }
  >
    {name}
  </button>
)

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
              <Button name="Получить шарик" />
              <div className="absolute -right-12 -top-5">
                <img src="img/30sm.png" alt="balloon" width={70} height={110} />
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
          <BlockOfCards
            title="Каталог шаров"
            data={catalogData}
            columnsCount={4}
          />
          <BlockOfCards
            title="Готовые наборы"
            data={setsData}
            columnsCount={3}
          />
          {/* <div className="mt-36">
            <Title title="Каталог шаров" />
            <div className="flex flex-wrap justify-center space-x-5">
              <Card
                title="Обычные шарики"
                desc="большой выбор, в наличии все цвета"
                href="/"
                src="img/catalog/standart.webp"
              />
              <Card
                title="Шарики с рисунком"
                desc="большой выбор на любой праздник"
                href="/"
                src="img/catalog/withpicture.webp"
              />
              <Card
                title="Цифры"
                desc="большой выбор"
                href="/"
                src="img/catalog/numbers.webp"
                small
              />
              <Card
                title="Фигуры"
                desc="большой выбор"
                href="/"
                src="img/catalog/figures.png"
                small
              />
            </div>
          </div> */}
        </Block>
        <div className="relative min-h-192 bg-bg">
          <div className="absolute top-0 w-full overflow-hidden">
            <svg
              style={{
                width: '150%',
                height: '0.75vw',
                fill: 'rgb(255, 255, 255)',
                transform: 'scaleY(-1)',
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 10"
              preserveAspectRatio="none"
            >
              <path d="M992 8.2L983.8 0l-8.2 8.2-8.2-8.2-8.2 8.2L951 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L869 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L787 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L705 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L623 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L541 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L459 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L377 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L295 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L213 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L131 0l-8.2 8.2-8.2-8.2-8.2 8.2L98.2 0 90 8.2 81.8 0l-8.2 8.2L65.4 0l-8.2 8.2L49 0l-8.2 8.2L32.6 0l-8.2 8.2L16.2 0 8 8.2-.2 0v10h1000.4V0"></path>
            </svg>
          </div>
          <div className="absolute bottom-0 w-full overflow-hidden">
            <svg
              style={{
                width: '150%',
                height: '0.75vw',
                fill: 'rgb(255, 255, 255)',
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 10"
              preserveAspectRatio="none"
            >
              <path d="M992 8.2L983.8 0l-8.2 8.2-8.2-8.2-8.2 8.2L951 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L869 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L787 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L705 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L623 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L541 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L459 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L377 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L295 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L213 0l-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2-8.2-8.2-8.2 8.2L131 0l-8.2 8.2-8.2-8.2-8.2 8.2L98.2 0 90 8.2 81.8 0l-8.2 8.2L65.4 0l-8.2 8.2L49 0l-8.2 8.2L32.6 0l-8.2 8.2L16.2 0 8 8.2-.2 0v10h1000.4V0"></path>
            </svg>
          </div>
          <img
            className="absolute opacity-15"
            src="img/map.png"
            alt="map"
            // width={100}
            height="100%"
          />
          <Block className="py-36 ">
            <div className="flex justify-between">
              <Title title="Почему Красноярцы выбирают нас" white />
              <Button name="Каталог шаров" className="mt-6" />
            </div>
          </Block>
        </div>
        <div>
          <Block className="py-32">
            <Title title="Стоимость доставки" />
            <img
              className="w-full"
              src="img/delivery_map.jpg"
              alt="delivery_map"
              // width="100%"
              // height="100%"
            />
          </Block>
        </div>
      </div>
    </MainLayout>
  )
}
