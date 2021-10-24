import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const {
  faWhatsapp,
  faViber,
  faTelegramPlane,
} = require('@fortawesome/free-brands-svg-icons')
const { faPhone } = require('@fortawesome/free-solid-svg-icons')

const ContactIconBtn = ({ url, icon, size = 'lg', className = null }) => (
  <FontAwesomeIcon
    className={
      'cursor-pointer text-primary hover:text-toxic duration-300 hover:scale-125' +
      (className ? ' ' + className : '')
    }
    icon={icon}
    onClick={(event) => {
      event.stopPropagation()
      window.open(url)
    }}
    size={size}
  />
)

const ContactsIconsButtons = ({ user }) => (
  <div className="flex items-center p-2 gap-x-2 tablet:gap-x-4 flex-nowrap">
    {user.phone && (
      <ContactIconBtn
        icon={faPhone}
        className="text-yellow-600"
        url={'tel:+' + user.phone}
      />
    )}
    {user.whatsapp && (
      <ContactIconBtn
        icon={faWhatsapp}
        className="text-green-600"
        url={'https://wa.me/' + user.whatsapp}
      />
    )}
    {user.viber && (
      <ContactIconBtn
        icon={faViber}
        className="text-purple-600"
        url={'viber://chat?number=' + user.viber}
      />
    )}
    {user.telegram && (
      <ContactIconBtn
        icon={faTelegramPlane}
        url={'https://t.me/' + user.telegram}
      />
    )}
    {user.email && (
      <ContactIconBtn icon={faEnvelope} url={'mailto:' + user.email} />
    )}
  </div>
)

export default ContactsIconsButtons
