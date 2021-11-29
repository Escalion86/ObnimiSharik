import { motion } from 'framer-motion'
import Block from '@components/Block'
import Title from '@components/Title'
import DeliveryPriceItem from '@components/DeliveryPriceItem'
import DeviceCheck from '@components/DeviceCheck'
import { useState } from 'react'

const DeliveryBlock = () => {
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
          fill-opacity={hover ? '0.5' : '0.3'}
          className="duration-300 cursor-pointer"
          // stroke-opacity="0.8"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        {/* <path d="M1681 1H1V951H1681V1Z" stroke="black" /> */}
        <text
          x={textX}
          y={textY}
          font-size="70"
          font-weight="bold"
          // font-family="Avenir, Helvetica, sans-serif"
          style={{ cursor: 'pointer' }}
          fill="white"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {price}
          <tspan font-size="52">₽</tspan>
        </text>
      </>
    )
  }

  const DistrictNorthWest = ({ color, price }) => (
    <District
      d="M336 587.5L240.5 648.5L196 608.5L181 441L207.5 199.5L327.5 39L553.5 7.5L834.5 23.5L1209.5 14L1369.5 73L1362.5 129L1309 180.5L1271 277.5L1240.5 271.5L1238.5 225L1196.5 191L1139.5 201.5L1104 166.5L1092 172.5L1050 162.5L891.5 252.5L905.5 307.5L726.5 361.5L628.5 358L532 302L518 335.5L439 340L375.5 452L419 554.5L336 587.5Z"
      color={color}
      price={price}
      textX="618"
      textY="207"
    />
  )

  const DistrictWest = ({ color, price }) => (
    <District
      d="M237 739.5L166.5 744V707L253.5 660.5L338.5 606L417.5 568L469 562.5L479 616.5L499 660.5L572 649L591.5 654L552 676L404.5 721L290.5 730L237 739.5Z"
      color={color}
      price={price}
      textX="287"
      textY="690"
    />
  )

  const DistrictOctober = ({ color, price }) => (
    <District
      d="M429 554L387.5 454.5L449.5 359V347H520L531.5 331.5L558 411L581 435L608 417L715 428L732.5 455L742 492.5L737.5 507V534.5L702.5 550L676 580.5L639 591L591.5 638.5L503.5 649.5L488 614.5L476 551.5L429 554Z"
      color={color}
      price={price}
      textX="510"
      textY="527"
    />
  )

  const DistrictCenter = ({ color, price }) => (
    <District
      d="M661 630.5L654.5 593.5L679 585.5L704.5 557L742 537.5V508.5L747 492.5L736.5 452.5L715 421.5L608 411L581 427.5L562.5 404L530.5 313.5L535 312.5L627.5 364.5L727.5 366.5L908 314.5L925.5 344.5L918.5 409L901 449L899.5 474.5L938 490V521L908 536.5L875 546.5L832 549L798.5 555.5L767 583.5L693 619.5L661 630.5Z"
      color={color}
      price={price}
      textX="730"
      textY="440"
    />
  )

  const DistrictSoviet = ({ color, price }) => (
    <District
      d="M1014 522L966.5 520L941 485L906 470.5L907.5 450.5L925 411.5L932 345L911 308.5L897.5 255.5L1052 168L1092 177.5L1103.5 173.5L1139.5 207L1196.5 195.5L1235 227.5V273.5L1212 313L1183.5 336V401.5L1134.5 430L1125 451L1107.5 474.5L1066 501.5L1014 522Z"
      color={color}
      price={price}
      textX="980"
      textY="350"
    />
  )

  const DistrictSverdlov = ({ color, price }) => (
    <District
      d="M395 816L381.5 786L559.5 720L586 703L631.5 688.5L743.5 663L758.5 699L753 719.5L757 753L640.5 824L395 816Z"
      color={color}
      price={price}
      textX="510"
      textY="790"
    />
  )

  const DistrictKirov = ({ color, price }) => (
    <District
      d="M762.5 735.5L759.5 720L762.5 697.5L749 661.5L781.5 650.5L820 611.5L877.5 589.5L945 550.5L980 547.5L1021.5 580L1086.5 524.5L1173 476.5L1344 443.5L1357.5 451L1369 472.5L1386.5 483.5L1381 507L1397.5 560.5L1392.5 594L1309.5 637.5L1222.5 673H1203.5L1196.5 666L1151.5 673L1070.5 708.5L1043 659L923.5 704.5L892.5 711L762.5 735.5Z"
      color={color}
      price={price}
      textX="1000"
      textY="640"
    />
  )
  const DistrictSouthEast = ({ color, price }) => (
    <District
      d="M709 861.5L692.5 801L763.5 759.5V741L923.5 711.5L1029.5 673L1067 719.5L1127 695.5L1175 683L1263.5 670.5L1408 601L1392 481H1404.5L1439.5 567.5L1455.5 791.5L1443.5 872L1344 903L1163 912L836 893L709 861.5Z"
      color={color}
      price={price}
      textX="1060"
      textY="830"
    />
  )

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
          <DistrictNorthWest price="249" color="red" />
          <DistrictWest price="149" color="blue" />
          <DistrictOctober price="99" color="green" />
          <DistrictCenter price="149" color="blue" />
          <DistrictSoviet price="199" color="purple" />
          <DistrictSverdlov price="149" color="blue" />
          <DistrictKirov price="199" color="purple" />
          <DistrictSouthEast price="249" color="red" />
        </svg>
      </div>
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
}

export default DeliveryBlock
