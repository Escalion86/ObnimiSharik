import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const {
  faWhatsapp,
  faViber,
  faTelegramPlane,
} = require('@fortawesome/free-brands-svg-icons')
const { faPhone } = require('@fortawesome/free-solid-svg-icons')

const ContactIconBtn = ({ url, icon, className = null }) => (
  <FontAwesomeIcon
    className={
      'ml-4 cursor-pointer text-primary hover:text-toxic duration-300 hover:scale-125' +
      (className ? ' ' + className : '')
    }
    icon={icon}
    onClick={(event) => {
      event.stopPropagation()
      window.open(url)
    }}
  />
)

const ContactsIconsButtons = ({ user }) => (
  <>
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
  </>
)

export default ContactsIconsButtons
