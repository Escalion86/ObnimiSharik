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
  return result[0]
}

export async function fetchingProducts(updateData = () => {}) {
  const resp = await fetch('/api/products')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ products: resp })
  return resp
}

export async function fetchingSets(updateData = () => {}) {
  const resp = await fetch('/api/sets')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ sets: resp })
  return resp
}

export async function fetchingProductTypes(updateData = () => {}) {
  const resp = await fetch('/api/producttypes')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ productTypes: resp })
  return resp
}

export async function fetchingSetTypes(updateData = () => {}) {
  const resp = await fetch('/api/settypes')
    .then((res) => res.json())
    .then((json) => json.data)
  updateData({ setTypes: resp })
  return resp
}
