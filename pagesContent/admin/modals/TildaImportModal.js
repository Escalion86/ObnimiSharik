import { useState, useRef } from 'react'
import Modal from '@admin/modals/Modal'
import Papa from 'papaparse'
import { DEFAULT_PRODUCT, DEFAULT_SET } from '@helpers/constants'
import {
  fetchingProductTypes,
  fetchingSetTypes,
  fetchingProducts,
} from '@helpers/fetchers'

import { toast } from 'react-toastify'
import replaceSpecialSymbols from '@helpers/replaceSpecialSymbols'
import { sendImage } from '@helpers/cloudinary'

const concatArrays = (setArray, addArray) => {
  addArray.forEach((arr) => {
    if (!setArray.includes(arr)) {
      setArray.push(arr)
    }
  })
}

// function resetLog() {
//   document.getElementById('log-div').innerHTML = ''
// }

// function appendLog(msg) {
//   document.getElementById('log-div').innerHTML += '<br>' + msg
// }

const InputFile = ({
  label = '',
  type,
  maxLength,
  name,
  value,
  onChange,
  required,
  accept,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <input
      className="px-2 py-1 bg-gray-200 border border-gray-700 rounded-lg"
      type="file"
      maxLength={maxLength}
      name={name}
      value={value}
      accept={accept}
      onChange={onChange}
      required={required}
    />
  </div>
)

const TildaImportModal = ({ onClose = () => {}, afterConfirm = () => {} }) => {
  const toastId = useRef(null)

  function changeHandler(evt, onClose, afterConfirm) {
    evt.stopPropagation()
    evt.preventDefault()

    toastId.current = toast(<div>Идет процесс импорта...</div>, {
      autoClose: false,
    })

    // FileList object.
    var files = evt.target.files

    var file = files[0]

    var fileReader = new FileReader()

    fileReader.onloadstart = function (progressEvent) {
      var msg =
        'File Name: ' +
        file.name +
        '<br>' +
        'File Size: ' +
        file.size +
        '<br>' +
        'File Type: ' +
        file.type

      console.log(msg)
    }

    fileReader.onload = function (progressEvent) {
      // console.log('onload!')
      var stringData = fileReader.result
      // console.log(' ---------------- File Content ----------------: ')
      // console.log(stringData)
      const parseResult = Papa.parse(stringData, {
        quotes: false, //or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ';',
        header: true,
        newline: '',
        skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
        columns: null, //or array of strings
      })
      // console.log(`parseResult`, parseResult)

      const mapProduct = (product) => {
        return {
          ...DEFAULT_PRODUCT,
          name: replaceSpecialSymbols(product['Title']),
          description: replaceSpecialSymbols(
            product['Description']
              .replace(/<br\s*[\/]?>/gi, `\n`)
              .replace(/(<([^>]+)>)/gi, ``)
          ),
          price: product['Price'] * 100,
          images: product['Photo'].split(' '),
          typesId: product['Category'].split(';'),
          article: product['SKU'],
        }
      }

      const mapSet = (set) => {
        const productCountArticles = set['Text']
          ? set['Text']
              .replace(/\s/g, '')
              .split('<br/>')
              .filter((item) => item)
          : []
        return {
          ...DEFAULT_SET,
          name: replaceSpecialSymbols(set['Title']),
          description: replaceSpecialSymbols(
            set['Description']
              .replace(/<br\s*[\/]?>/gi, `\n`)
              .replace(/(<([^>]+)>)/gi, ``)
          ),
          price: set['Price'] * 100,
          images: set['Photo'].split(' '),
          typesId: set['Category'].split(';'),
          article: set['SKU'],
          productCountArticles,
        }
      }

      const parsedProducts = parseResult['data']
        .filter(
          (product) =>
            product &&
            // !product['Text'] &&
            product['Category'] &&
            // !product['Text']
            !product['Category'].includes('Набор')
        )
        .map(mapProduct)
      const parsedSets = parseResult['data']
        .filter(
          (product) =>
            product &&
            // product['Text']
            product['Category'] &&
            // product['Text']
            product['Category'].includes('Набор')
        )
        .map(mapSet)

      console.log(`parsedProducts`, parsedProducts)
      console.log(`parsedSets`, parsedSets)
      const productTypes = []
      parsedProducts.forEach((product) =>
        concatArrays(productTypes, product.typesId)
      )

      const setTypes = []
      parsedSets.forEach((set) => concatArrays(setTypes, set.typesId))

      console.log(`productTypes`, productTypes)
      console.log(`setTypes`, setTypes)

      sendImport(
        {
          productTypes: productTypes.map((type) => {
            return { name: type }
          }),
          setTypes: setTypes.map((type) => {
            return { name: type }
          }),
          products: parsedProducts,
          sets: parsedSets,
        },
        onClose,
        afterConfirm
      )
    }

    fileReader.onloadend = function (progressEvent) {
      // console.log('onloadend!')
      // FileReader.EMPTY, FileReader.LOADING, FileReader.DONE
      // console.log('readyState = ' + fileReader.readyState)
    }

    fileReader.onerror = function (progressEvent) {
      console.log('Has Error!')
    }

    // Read file asynchronously.
    fileReader.readAsText(file, 'UTF-8') // fileReader.result -> String.
  }

  const sendImport = async (
    { productTypes, setTypes, products, sets },
    afterDone = () => {},
    afterConfirm = () => {}
  ) => {
    const contentType = 'application/json'
    try {
      let res = await fetch('/api/producttypes', {
        method: 'DELETE',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        // body: JSON.stringify(productTypes),
      })
      if (!res.ok) {
        throw new Error(res.status)
      }

      res = await fetch('/api/producttypes', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(productTypes),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const newProductTypes = await fetchingProductTypes()

      // console.log('newProductTypes: ', newProductTypes)

      res = await fetch('/api/settypes', {
        method: 'DELETE',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
      })
      if (!res.ok) {
        throw new Error(res.status)
      }
      // console.log(`setTypes`, setTypes)
      res = await fetch('/api/settypes', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(setTypes),
      })

      if (!res.ok) {
        throw new Error(res.status)
      }

      const newSetTypes = await fetchingSetTypes()

      let newProducts = await Promise.all(
        products.map(async (product) => {
          return {
            ...product,
            typesId: product.typesId.map(
              (type) =>
                newProductTypes.find((productType) => productType.name === type)
                  ._id
            ),
            images: await Promise.all(
              product.images.map(async (image) => {
                const imageBlob = await fetch(image)
                  .then((response) => response.blob())
                  .catch((err) => {
                    console.log(`err image`, image)
                    return null
                  })
                if (imageBlob)
                  return await sendImage(imageBlob, null, 'products')
                return image
              })
            ),

            // images: product.images.map(async (image) => {
            //   let newImageUrl = await sendImage(
            //     image,
            //     (imageUrl) => console.log(`imageUrl`, imageUrl),
            //     'products'
            //   )
            //   console.log(`newImageUrl`, newImageUrl)
            //   return newImageUrl
            // }),
          }
        })
      )

      // ADD

      // Удаляем старые данные по товарам
      res = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
      })
      if (!res.ok) {
        throw new Error(res.status)
      }

      // Добавляем новые данные по товарам
      res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(newProducts),
      })

      if (!res.ok) {
        throw new Error(res.status)
      }

      newProducts = await fetchingProducts()

      const newSets = await Promise.all(
        sets.map(async (set) => {
          const productsIdCount = {}
          set.productCountArticles.map((countArticle) => {
            const article = countArticle
              .substring(countArticle.indexOf('-') + 1)
              .replace('/([^()]*)/g', '')
            const product = newProducts.find(
              (product) => product.article === article
            )
            const count = Number(
              countArticle
                .substring(0, countArticle.indexOf('-'))
                .replace(/[^+\d]/g, '')
            )
            if (product) productsIdCount[product._id] = count
          })

          const newSet = {
            ...set,
            typesId: set.typesId.map(
              (type) => newSetTypes.find((setType) => setType.name === type)._id
            ),
            productsIdCount,
            images: await Promise.all(
              set.images.map(async (image) => {
                const imageBlob = await fetch(image)
                  .then((response) => response.blob())
                  .catch((err) => {
                    console.log(`err image`, image)
                    return null
                  })
                if (imageBlob) return await sendImage(imageBlob, null, 'sets')
                return image
              })
            ),
          }
          delete newSet.productCountArticles
          return newSet
        })
      )

      // Удаляем старые данные по наборам
      res = await fetch('/api/sets', {
        method: 'DELETE',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
      })
      if (!res.ok) {
        throw new Error(res.status)
      }

      // Сохраняем новые данные по наборам
      res = await fetch('/api/sets', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(newSets),
      })

      if (!res.ok) {
        throw new Error(res.status)
      }

      // Чистим товарооборот, так как он никак не будет соответствовать новым данным
      res = await fetch('/api/productcirculations', {
        method: 'DELETE',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
      })
      if (!res.ok) {
        throw new Error(res.status)
      }

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        render: 'Импорт завершен успешно',
        autoClose: 6000,
      })
      afterDone()
      afterConfirm()
      // router.push('/admin')
      // router.reload()
      // afterConfirm()
    } catch (error) {
      console.log('error: ', error)
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        render: 'Импорт завершен с ошибкой',
      })
    }
  }

  return (
    <Modal onClose={onClose}>
      <>
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold text-center">
            Импортирование csv
          </div>
          <InputFile
            key="tildaCsv"
            label="Файл экспорта из Tilda в формате csv"
            accept=".csv"
            name="tilda"
            onChange={(e) => changeHandler(e, onClose, afterConfirm)}
            required
          />
          {/* <Button onClick={uploadToServer} name="Импорт" small inverse /> */}
        </div>
        {/* <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div> */}
      </>
    </Modal>
  )
}

export default TildaImportModal
