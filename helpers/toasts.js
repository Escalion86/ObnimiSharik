import { toast } from 'react-toastify'
import IconButton from '@components/IconButton'

const toastContainer = (message, buttons) => (
  <div className="flex justify-between">
    {message}
    <div className="">
      {buttons.map((button, index) => (
        <IconButton
          name={button.name}
          onClick={button.onClick}
          small
          inverse
          key={'toastButton' + index}
        />
      ))}
    </div>
  </div>
)

const toastCfg = {
  autoClose: 5000,
  // closeOnClick: true,
  pauseOnHover: true,
  // onOpen: () => console.log('Called when I open'),
  // onClose: () => console.log('Called when I close'),
}

const toasts = {
  default: (message, buttons = []) =>
    toast(toastContainer(message, buttons), toastCfg),
  info: (message, buttons = []) =>
    toast.info(toastContainer(message, buttons), toastCfg),
  success: (message, buttons = []) =>
    toast.success(toastContainer(message, buttons), toastCfg),
  warn: (message, buttons = []) =>
    toast.warn(toastContainer(message, buttons), toastCfg),
  error: (message, buttons = []) =>
    toast.error(toastContainer(message, buttons), toastCfg),
}

export default toasts
