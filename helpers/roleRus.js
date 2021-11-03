import { ROLES } from './constants'

const roleRus = (role) => {
  return ROLES.find((roleRes) => roleRes.value === role)?.name ?? '[без роли]'
}

export default roleRus
