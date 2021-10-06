import { mutate } from 'swr'
import toasts from '@helpers/toasts'

const contentType = 'application/json'

export const putData = async (
  url,
  form,
  callback = null,
  toastOnSuccess = null,
  toastOnError = null
) => {
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
    if (callback) callback(data)
    if (toastOnSuccess) toasts.success(toastOnSuccess)
  } catch (error) {
    console.log('Failed to update (PUT) on ' + url)
    console.log(error)
    if (toastOnError) toasts.error(toastOnError)
  }
}

/* The POST method adds a new entry in the mongodb database. */
export const postData = async (
  url,
  form,
  callback = null,
  toastOnSuccess = null,
  toastOnError = null
) => {
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
    if (callback) callback(data)
    if (toastOnSuccess) toasts.success(toastOnSuccess)
  } catch (error) {
    console.log('Failed to add (POST) on ' + url)
    console.log(error)
    if (toastOnError) toasts.error(toastOnError)
  }
}

export const deleteData = async (
  url,
  callback = null,
  toastOnSuccess = null,
  toastOnError = null
) => {
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
    if (callback) callback(data)
    if (toastOnSuccess) toasts.success(toastOnSuccess)
  } catch (error) {
    console.log('Failed to delete on ' + url)
    console.log(error)
    if (toastOnError) toasts.error(toastOnError)
  }
}
