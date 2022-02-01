import { CheckBox } from '@admincomponents/forms/forForms'
import { motion } from 'framer-motion'
import cn from 'classnames'

// const variants = {
//   visible: { opacity: 1, height: 'auto' },
//   hidden: { opacity: 0, height: 0 },
// }

const variants = {
  visible: {},
  hidden: { transition: { type: 'spring', stiffness: 100 } },
}

const Card = ({
  className,
  inLine = false,
  onClick = null,
  children,
  multiselectMode = false,
  checked = false,
  onCheckClick = null,
  hidden = false,
}) => (
  <motion.div
    className={cn(
      'flex justify-between my-1.5 bg-white shadow border-t border-b border-gray-300 hover:shadow-medium-active',
      className,
      { 'laptop:h-10': inLine }
    )}
    // variants={variants}
    // animate="visible"
    // initial="hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      delay: 1000,
      default: { duration: 0.3 },
    }}
  >
    <div
      className={
        'duration-500 transition-scale overflow-hidden flex items-center justify-center rounded-l-lg bg-white' +
        (multiselectMode
          ? ' w-8 max-w-8 border-r'
          : ' w-0 scale-x-0 -translate-x-1/2')
      }
    >
      <CheckBox checked={checked} onClick={onCheckClick} />
    </div>
    <div
      onClick={onClick}
      className={
        'relative flex items-stretch justify-between flex-1' +
        (onClick ? ' cursor-pointer' : '')
      }
    >
      {children}
    </div>
  </motion.div>
)

export default Card
