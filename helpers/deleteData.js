const contentType = 'application/json'

const deleteData = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      // body: JSON.stringify({ test: 'test' }),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }
    // const { data } = await res.json()
    // mutate(url, data, false)
    // console.log(`data`, data)
    // afterConfirm()
  } catch (error) {
    // setMessage('Failed to add on ' + url)
    console.log('Failed to delete on ' + url)
  }
}

export default deleteData
