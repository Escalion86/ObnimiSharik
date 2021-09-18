export async function fetchingAll(setState = () => {}) {
  console.log('Запущен fetchingAll')
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
  return result[0]
}

export async function fetchingProducts(updateData = () => {}) {
  console.log('Запущен fetchingProducts')
  const resp = await fetch('/api/products')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingSets(updateData = () => {}) {
  console.log('Запущен fetchingSets')
  const resp = await fetch('/api/sets')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingProductTypes(updateData = () => {}) {
  console.log('Запущен fetchingProductTypes')
  const resp = await fetch('/api/producttypes')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingSetTypes(updateData = () => {}) {
  console.log('Запущен fetchingSetTypes')
  const resp = await fetch('/api/settypes')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingInvitations(updateData = () => {}) {
  console.log('Запущен fetchingInvitations')
  const resp = await fetch('/api/invitations')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingUsers(updateData = () => {}) {
  console.log('Запущен fetchingUsers')
  const resp = await fetch('/api/users')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingProductCirculations(updateData = () => {}) {
  console.log('Запущен fetchingProductCirculations')
  const resp = await fetch('/api/productcirculations')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingClients(updateData = () => {}) {
  console.log('Запущен fetchingClients')
  const resp = await fetch('/api/clients')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingOrders(updateData = () => {}) {
  console.log('Запущен fetchingOrders')
  const resp = await fetch('/api/orders')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}

export async function fetchingPayments(updateData = () => {}) {
  console.log('Запущен fetchingPayments')
  const resp = await fetch('/api/payments')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData(resp)
  return resp
}
