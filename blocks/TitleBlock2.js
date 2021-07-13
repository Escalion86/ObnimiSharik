import Block from '@components/Block'
import Button from '@components/Button'

const TitleBlock2 = () => (
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

export default TitleBlock2
