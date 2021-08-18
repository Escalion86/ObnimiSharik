export async function fetchingAll(setState = () => {}) {
  const urls = ['/api/admin']
  const result = await Promise.all(
    urls.map(async (url) => {
      const resp = await fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)
      return resp
    })
  )
  setState(result[0])
  console.log('Запущен fetchingAll')
  return result[0]
}

export async function fetchingProducts(updateData = () => {}) {
  const resp = await fetch('/api/products')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ products: resp })
  console.log('Запущен fetchingProducts')
  return resp
}

export async function fetchingSets(updateData = () => {}) {
  const resp = await fetch('/api/sets')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ sets: resp })
  console.log('Запущен fetchingSets')
  return resp
}

export async function fetchingProductTypes(updateData = () => {}) {
  const resp = await fetch('/api/producttypes')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ productTypes: resp })
  console.log('Запущен fetchingProductTypes')
  return resp
}

export async function fetchingSetTypes(updateData = () => {}) {
  const resp = await fetch('/api/settypes')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ setTypes: resp })
  console.log('Запущен fetchingSetTypes')
  return resp
}

export async function fetchingInvitations(updateData = () => {}) {
  const resp = await fetch('/api/invitations')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ invitations: resp })
  console.log('Запущен fetchingInvitations')
  return resp
}

export async function fetchingUsers(updateData = () => {}) {
  const resp = await fetch('/api/users')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ users: resp })
  console.log('Запущен fetchingUsers')
  return resp
}

export async function fetchingProductCirculations(updateData = () => {}) {
  const resp = await fetch('/api/productcirculations')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ productCirculations: resp })
  console.log('Запущен fetchingProductCirculations')
  return resp
}
