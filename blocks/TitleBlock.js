import Block from '@components/Block'
import HorizontalSeparator from '@components/HorizontalSeparator'
import Button from '@components/Button'

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

export default TitleBlock
