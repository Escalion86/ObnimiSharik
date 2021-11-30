import { motion } from 'framer-motion'
import Block from '@components/Block'
import Title from '@components/Title'
import DeliveryPriceItem from '@components/DeliveryPriceItem'
import DeviceCheck from '@components/DeviceCheck'
import { useState } from 'react'

const DeliveryBlock = ({ districts }) => {
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

  const District = ({ d, textX, textY, color, price }) => {
    const [hover, setHover] = useState(false)
    return (
      <>
        <path
          d={d}
          stroke={color}
          fill={color}
          fillOpacity={hover ? '0.65' : '0.35'}
          className="duration-300 cursor-pointer"
          // stroke-opacity="0.8"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        {/* <path d="M1681 1H1V951H1681V1Z" stroke="black" /> */}
        <text
          x={textX}
          y={textY}
          fontSize="70"
          fontWeight="bold"
          // font-family="Avenir, Helvetica, sans-serif"
          style={{ cursor: 'pointer' }}
          fill="white"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {price}
          <tspan fontSize="52">₽</tspan>
        </text>
      </>
    )
  }

  const districtsDifPrices = [
    ...new Set(districts.map((district) => district.deliveryPrice)),
  ].sort((a, b) => b - a)

  const districtsColors = [
    '#EB144C',
    '#00C074',
    '#0693E3',
    '#FF6900',
    '#AA11FF',
    '#75FC45',
    '#3E118C',
    '#F74DA7',
    '#FCA900',
    '#7B8893',
  ]

  return (
    <Block className="py-32">
      <Title title="Стоимость доставки" />
      <div className="relative w-full">
        <img
          className="w-full"
          src="img/delivery_map.jpg"
          alt="delivery_map"
          // width="100%"
          // height="100%"
        />
        <svg
          preserveAspectRatio="none"
          className="absolute top-0 left-0 right-0"
          // width="1682"
          // height="952"
          viewBox="0 0 1682 952"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {districts &&
            districts
              .filter((district) => district.svg?.d)
              .map((district, index) => (
                <District
                  key={'district' + index}
                  d={district.svg.d}
                  color={
                    districtsColors[
                      districtsDifPrices.indexOf(district.deliveryPrice)
                    ]
                    // districtsColors[index % 10]
                    // district.svg.color ? '#' + district.svg.color : 'green'
                  }
                  price={district.deliveryPrice / 100}
                  textX={district.svg.textX ?? 0}
                  textY={district.svg.textY ?? 0}
                />
              ))}
          {/* <DistrictNorthWest price="249" color="red" />
          <DistrictWest price="149" color="blue" />
          <DistrictOctober price="99" color="green" />
          <DistrictCenter price="149" color="blue" />
          <DistrictSoviet price="199" color="purple" />
          <DistrictSverdlov price="149" color="blue" />
          <DistrictKirov price="199" color="purple" />
          <DistrictSouthEast price="249" color="red" /> */}
        </svg>
      </div>
      <div className="flex flex-row-reverse flex-wrap justify-center mt-10 space-x-2">
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
        {districtsDifPrices.map((districtPrice, index) => (
          <DeliveryPriceItem
            key={'districtPtice' + index}
            price={districtPrice / 100}
            text={'Зона доставки №' + index}
            color={districtsColors[index]}
          />
        ))}
        <DeliveryPriceItem
          price="0"
          text="Самовывоз шариков"
          text2="с 9:00 до 21:00"
          color={null}
        />
        {/* <DeliveryPriceItem price="99" text="Зона доставки №1" color="#B9E6E3" />
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
        /> */}
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
}

export default DeliveryBlock
