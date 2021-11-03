import { ROLES } from './constants'

const roleRus = (role) => {
  return ROLES.find((roleRes) => roleRes.value === role)?.name ?? 'Клиент'
}

export default roleRus
