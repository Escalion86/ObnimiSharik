import { mutate } from 'swr'

const contentType = 'application/json'

export const putData = async (url, form, callback, onError) => {
  // const { id } = router.query

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(form),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }

    const { data } = await res.json()

    mutate(url, data, false) // Update the local data without a revalidation
    callback(data)
  } catch (error) {
    onError('Failed to update (PUT) on ' + url)
  }
}

/* The POST method adds a new entry in the mongodb database. */
export const postData = async (url, form, callback, onError) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(form),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }
    const { data } = await res.json()
    // mutate(url, data, false)
    // console.log(`data`, data)
    callback(data)
  } catch (error) {
    onError('Failed to add (POST) on ' + url)
  }
}

export const deleteData = async (url, callback, onError) => {
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
    const { data } = await res.json()
    // mutate(url, data, false)
    callback(data)
  } catch (error) {
    onError('Failed to delete on ' + url)
  }
}
