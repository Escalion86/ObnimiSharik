export const deleteImage = async (imagePublicId) => {
  // const { id } = router.query

  try {
    const res = await fetch('/api/cloudimages', {
      method: 'DELETE',
      // headers: {
      //   Accept: contentType,
      //   'Content-Type': contentType,
      // },
      body: imagePublicId,
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status)
    }

    // const { data } = await res.json()
    // console.log(`data`, data)
    // mutate(url, data, false) // Update the local data without a revalidation
    // afterConfirm()
  } catch (error) {
    // setMessage('Failed to update on ' + url)
  }
}

export const deleteImages = async (arrayOfImagesUrls) => {
  if (arrayOfImagesUrls.length > 0)
    await Promise.all(
      arrayOfImagesUrls.map(async (imageUrl) => {
        if (imageUrl.lastIndexOf('obnimisharik/') > 0) {
          await deleteImage(
            imageUrl.substring(
              imageUrl.lastIndexOf('obnimisharik/'),
              imageUrl.lastIndexOf('.')
            )
          )
        } else if (!imageUrl.includes('https://res.cloudinary.com')) {
          await deleteImage('obnimisharik/' + imageUrl)
        }
      })
    )
}

export const sendImage = async (
  image,
  callback,
  folder = null,
  imageName = null
) => {
  if (typeof image === 'object') {
    const formData = new FormData()
    formData.append('file', image)
    formData.append(
      'upload_preset',
      folder ? 'obnimisharik_' + folder : 'obnimisharik'
    )
    if (imageName) {
      // console.log(`imageName`, imageName)
      // await deleteImage(imageName)
      // await deleteImages([(folder ? folder + '/' : '') + imageName])

      formData.append('public_id', imageName)
      // formData.append('filename_override', true)
      // formData.append('use_filename', true)
    }

    await fetch('https://api.cloudinary.com/v1_1/escalion-ru/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          // return data.secure_url
          callback(data.secure_url)
        }
      })
      .catch((err) => console.error(err))
  }
}
