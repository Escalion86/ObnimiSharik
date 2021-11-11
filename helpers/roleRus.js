import { ROLES } from './constants'

const roleRus = (role) => {
  if (!role) return '[без роли]'
  return ROLES.find((roleRes) => roleRes.value === role)?.name ?? '[без роли]'
}

export default roleRus
