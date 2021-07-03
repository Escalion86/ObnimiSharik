import Block from '../components/Block'
import MainLayout from '../components/MainLayout'
import Link from 'next/link'
// const background = require('../public/img/bg.jpg')
import Title from '../components/Title'
import HorizontalSeparator from '../components/HorizontalSeparator'
import Card from '../components/Card'
import BlockOfCards from '../components/BlockOfCards'
import ImageZoom from 'react-medium-image-zoom'
import { motion } from 'framer-motion'
import useWindowDimensions from '../helpers/useWindowDimensions'
import Button from '../components/Button'

// let csvToJson = require('convert-csv-to-json')
// const csvFilePath='tilda.csv'
// const csv=require('csvtojson')
// const request=require('request')

import { catalogData, setsData } from '../utils/temp_db'

import dbConnect from '../utils/dbConnect'
import Balloons from '../models/Balloons'
import Types from '../models/Types'
import Sets from '../models/Sets'

import { signIn, signOut, useSession } from 'next-auth/client'

// import csv from '../tilda.csv'

// const csvToJsonFunc = () => {
//   csv()
// // .fromFile(csvFilePath)
// .fromStream(request.get('https://store.tilda.cc/store/export/?task=922544378201'))
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
// })
//   // const json = csvToJson.formatValueByType().getJsonFromCsv('tilda.csv')
//   // console.log(`json`, js`on)
// }

const SpecialCard = ({ src }) => (
  <ImageZoom
    image={{
      src: src,
      alt: 'special',
      className: 'w-48 shadow-sm rounded-xl cursor-zoom-in',
      // style: { width: '50em' }
    }}
    zoomImage={{
      src: src,
      alt: 'special',
    }}
  />
  // <img
  //   src={src}
  //   alt="special"
  //   className="w-48 shadow-sm rounded-xl cursor-zoom-in"
  // />
)

const InfoItem = ({ src, text }) => (
  <div className="flex items-center justify-center">
    <div className="flex items-center justify-between space-x-2 w-80">
      <img src={src} alt="info" className="w-14 h-14" />
      <div className="text-base font-light text-white">{text}</div>
    </div>
  </div>
)

const DeliveryPriceItem = ({ color, price, text, text2 }) => (
  <div className="flex justify-center flex-1 min-w-36">
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-gray-600">{price}₽</div>
      <div className="text-base font-light text-black">{text}</div>
      {text2 && <div className="text-base font-light text-black">{text2}</div>}
      {color && (
        <div className="w-full h-3 mt-2" style={{ backgroundColor: color }} />
      )}
    </div>
  </div>
)

export default function Home({ balloons, sets, types }) {
  const { height, width } = useWindowDimensions()
  const [session, loading] = useSession()

  if (session) console.log(`session`, session)

  console.log(`balloons`, balloons)

  const deliveryBalloons = {
    truck: {
      initial: { left: '100%' },
      left: [
        'calc(0%- 170px)',
        'calc(100% - 170px)',
        'calc(100% - 170px)',
        'calc(130% - 170px)',
      ],
      // ease: ['backIn', 'easeOut', 'easeOut', 'easeOut'],
      transition: {
        // delay: 5,
        duration: 8,
        repeat: Infinity,
        // repeatDelay: 5,
        times: [0, 0.6, 0.75, 1],
      },
    },
    balloons: {
      opacity: [0, 0, 1, 1, 0],
      bottom: [0, 0, 70, 70, 100],
      transition: {
        // delay: 5,
        duration: 8,
        repeat: Infinity,
        // repeatDelay: 5,
        times: [0, 0.6, 0.7, 0.8, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  }

  const TitleBlock = () => (
    <Block>
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
    </Block>
  )

  const Title2Block = () => (
    <div>
      <Block>
        <div className="font-futuraDemi">
          <span className="text-6xl">Шарики</span>
          <span className="px-3 py-1 ml-2 text-4xl bg-yellow-300 rounded-full text-primary">
            по 70 руб/шт
          </span>
          <br />
          <span className="text-5xl">с самой выгодной доставкой</span>
          <br />
          <span className="flex text-5xl text-yellow-300">
            по Красноярску
            <div className="relative w-40 h-40">
              <img
                className="absolute -left-10 top-6"
                src="img/noroot.webp"
                alt="arrowroot"
                width={102}
                height={131}
              />
            </div>
          </span>
        </div>
        <div className="w-80">
          <div className="flex">
            <img
              src="img/animation/delivery-truck_3_.png"
              alt="arrowroot"
              width={76}
              height={76}
            />
            <div className="ml-5 text-xl">
              Доставка 99 руб. в любой район города.
              <br />
              (только до конца июня)
            </div>
          </div>
          <Button name="Заказать обратный звонок" className="w-full mt-3" alt />
        </div>
      </Block>
      <div className="w-full mt-48 overflow-hidden">
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
    </div>
  )

  const SpecialBlock = () => (
    <Block>
      <div className="px-10 pt-6 pb-8 overflow-hidden overflow-x-auto bg-white shadow-medium rounded-2xl mt-52">
        <Title title="Акции и скидки" small />
        <div
          className="flex justify-between space-x-2 min-w-min"
          // style={{ width: 950 }}
        >
          <SpecialCard src="img/special/1.png" />
          <SpecialCard src="img/special/2.png" />
          <SpecialCard src="img/special/3.png" />
          <SpecialCard src="img/special/4.png" />
          <SpecialCard src="img/special/5.png" />
        </div>
      </div>
    </Block>
  )

  const WhyWeBlock = () => (
    <div className="relative bg-bg">
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
        className="absolute h-full bg-cover opacity-15"
        src="img/map.png"
        alt="map"
        // width={100}
        height="100%"
      />
      <Block className="z-10 py-36">
        <div className="flex justify-between">
          <Title title="Почему Красноярцы выбирают нас" white />
          <Button name="Каталог шаров" className="mt-6" />
        </div>
        <div className="grid justify-around grid-cols-1 mt-8 gap-y-16 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-4">
          {/* <div className="flex justify-around grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-1 gap-y-2"> */}
          <InfoItem
            text="У нас большой выбор шаров на любой вкус и цвет, для любого события"
            src="icons/ballons_1.png"
          />
          <InfoItem
            text="Мы НЕ используем дешёвые китайские шары, которые могут вызвать аллергию"
            src="icons/cancel.png"
          />
          <InfoItem
            text="Мы обрабатываем шары специальным составом, чтобы они летали дольше"
            src="icons/paint-spray.webp"
          />
          <InfoItem
            text="Мы привозим качественные шары из Колумбии, Турции, Малайзии и Испании"
            src="icons/earth.png"
          />
          <InfoItem
            text="Перед доставкой клиентам мы проверяем каждый шарик на наличие брака"
            src="icons/check_1.png"
          />
          <InfoItem
            text="Мы круглосуточно доставляем шары по Красноярску нашим клиентам"
            src="icons/delivery-truck_2_.png"
          />
        </div>
      </Block>
    </div>
  )

  const DeliveryBlock = () => (
    <Block className="py-32">
      <Title title="Стоимость доставки" />
      <img
        className="w-full"
        src="img/delivery_map.jpg"
        alt="delivery_map"
        // width="100%"
        // height="100%"
      />
      <div className="flex flex-wrap justify-center mt-10 space-x-2">
        <DeliveryPriceItem
          price="0"
          text="Самовывоз шариков"
          text2="с 9:00 до 21:00"
          color={null}
        />
        <DeliveryPriceItem price="99" text="Зона доставки №1" color="#B9E6E3" />
        <DeliveryPriceItem
          price="149"
          text="Зона доставки №2"
          color="#8BB4F0"
        />
        <DeliveryPriceItem
          price="199"
          text="Зона доставки №3"
          color="#D9A1ED"
        />
        <DeliveryPriceItem
          price="249"
          text="Зона доставки №4"
          color="#D19D9D"
        />
        <div className="relative flex items-center pl-5 ml-1 text-gray-600 rounded-lg shadow-lg h-22">
          <img
            className="absolute -left-4 top-1"
            src="img/crescent-moon.webp"
            alt="night moon"
            // width="100%"
            // height="100%"
          />
          <div className="p-4">
            <div>
              <span className="text-base font-bold">Ночная доставка</span>
              <span className="text-sm"> с 22:00 до 9:00</span>
            </div>
            <div className="ml-8">
              <span className="text-base font-bold">+250₽</span>
              <span className="text-sm"> к зоне доставки</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden border-b h-36 border-primary">
        <motion.img
          variants={deliveryBalloons}
          initial="initial"
          animate="truck"
          exit="exit"
          className="absolute -bottom-2.5 z-10"
          src="img/animation/delivery-truck_3_.png"
          alt="truck"
          width="70px"
          height="70px"
        />
        <img
          className="absolute bottom-0 right-4"
          src="img/animation/house.png"
          alt="house"
          width="90px"
          height="90px"
        />
        <motion.img
          variants={deliveryBalloons}
          // initial="initial"
          animate="balloons"
          exit="exit"
          className="absolute bottom-0 transform opacity-0 right-6 -rotate-15"
          src="img/animation/balloons.png"
          alt="balloons"
          width="65px"
          height="65px"
        />
      </div>
    </Block>
  )

  return (
    <MainLayout title="Обними шарик - Главная">
      <div
        className="flex flex-col bg-white"
        style={{
          backgroundImage: `url('img/bg.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          // backgroundSize: 'cover',
          width: '100%',
          height: '1120px',
        }}
      >
        <div className="w-full h-20" />
        <div className="w-full h-40 pt-20">
          <Link href="/new">
            <a>Add Baloon</a>
          </Link>
        </div>
        {/* <div className="absolute bottom-0 w-full bg-white h-80" /> */}
        <div className="z-10 w-full mt-40">
          <Title2Block />
          {/* <SpecialBlock /> */}
          <div className="bg-white">
            <Block>
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
            </Block>
          </div>
          <WhyWeBlock />
          <DeliveryBlock />
        </div>
      </div>
    </MainLayout>
  )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  let result = await Types.find({})
  const types = result.map((doc) => {
    const type = doc.toObject()
    type._id = type._id.toString()
    return type
  })

  result = await Sets.find({})
  const sets = result.map((doc) => {
    const set = doc.toObject()
    set._id = set._id.toString()
    return set
  })

  /* find all the data in our database */
  result = await Balloons.find({})
  const balloons = result.map((doc) => {
    const baloon = doc.toObject()
    baloon._id = baloon._id.toString()
    return baloon
  })

  return { props: { balloons: balloons, types: types, sets: sets } }
}
