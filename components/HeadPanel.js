import Block from './Block'
import Link from 'next/link'
import { FiPhoneCall } from 'react-icons/fi'

const NavItem = ({ name = '', href = '' }) => (
  <Link href={href}>
    <a className="font-futura">{name}</a>
  </Link>
)

function HeadPanel() {
  return (
    <div className="fixed top-0 z-50 w-full">
      <div
        className="flex justify-between items-center space-x-3 shadow-md py-2.5 px-5 bg-header rounded-b-3xl flex-1 phoneV:mx-2 phoneH:mx-4 tablet:mx-6 laptop:mx-10 desktop:mx-14"
        // style={{ boxShadow: '0px 3px 10px 0px rgb(33 33 33)' }}
      >
        <a
          href="http://obnimisharik.ru"
          className="flex items-center flex-1 space-x-3"
        >
          <img src="/img/balloon.webp" alt="balloon" width={40} height={40} />
          <div className="text-lg leading-4 font-futuraDemi">
            Обними
            <br />
            шарик
          </div>
        </a>
        {/* <div className="flex flex-col flex-grow"> */}
        <nav className="justify-between flex-grow hidden max-w-xl laptop:flex">
          <NavItem name="Главная" href="/" />
          <NavItem name="Каталог шаров" href="/catalog" />
          <NavItem name="Акции и скидки" href="/special" />
          <NavItem name="Доставка" href="/delivery" />
          <NavItem name="Контакты" href="/contacts" />
        </nav>
        {/* </div> */}
        <div className="flex flex-col items-end flex-1 min-w-48">
          <a
            href="tel:83919897917"
            className="flex items-center space-x-2 font-futuraDemi"
          >
            <FiPhoneCall />
            <div>8 (391) 989-79-17</div>
          </a>
          <div className="text-xxs text-futura">
            г.Красноярск, ул. Телевизорная 8
          </div>
          {/* <div className="text-xs">Режим работы с 9:00 до 21:00</div> */}
        </div>
      </div>
    </div>
  )
}

export default HeadPanel
