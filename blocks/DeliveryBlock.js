import { motion } from 'framer-motion'
import Block from '@components/Block'
import Title from '@components/Title'
import DeliveryPriceItem from '@components/DeliveryPriceItem'
import DeviceCheck from '@components/DeviceCheck'

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

  return (
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
}

export default DeliveryBlock
