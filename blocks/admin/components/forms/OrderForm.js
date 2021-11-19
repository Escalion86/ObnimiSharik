import { useCallback, useEffect, useRef, useState } from 'react'

import {
  DEFAULT_ORDER,
  DEFAULT_PAYMENT,
  DEFAULT_PRODUCT_CIRCULATION,
  ORDER_STATUSES,
  ROLES,
} from '@helpers/constants'

import {
  Input,
  PriceInput,
  SelectClient,
  SelectDeliver,
  SelectAerodesigner,
  SelectOperator,
  SelectPaymentList,
  SelectProductsList,
  SelectSetsList,
  RadioBox,
  RowContainer,
  DateTimePicker,
  FormColumn,
  SelectDistrict,
  InputImages,
} from './forForms'

import { deleteData, postData, putData } from '@helpers/CRUD'

import Form from './Form'
import compareObjects from '@helpers/compareObjects'

import { useDispatch, useSelector } from 'react-redux'

import {
  faPencilAlt,
  faPlus,
  faChevronDown,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
import CardButton from '@admincomponents/cards/forCards/CardButton'
import modalsFunctions from '@adminblocks/modals/modalsFunctions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import IconButton from '@components/IconButton'
import { fetchingProductCirculations } from '@helpers/fetchers'
import { setProductCirculations } from '@state/actions'

import { useWindowDimensionsTailwind } from '@helpers/useWindowDimensions'
import formatDateTime from '@helpers/formatDateTime'
import formatDeliveryAddress from '@helpers/formatDeliveryAddress'
import getNoun from '@helpers/getNoun'
import formValidator from '@helpers/formValidator'

{
  /* <FontAwesomeIcon
        className={
          'w-6 h-6 text-gray-700 hover:scale-110 transform duration-200'
        }
        onClick={(e) => {
          e.stopPropagation()
          toggleSearchMode()
        }}
        icon={isSearchMode ? faTimes : faSearch}
      /> */
}

const FormMenuItem = ({
  title,
  text,
  active = false,
  disabled = false,
  onClick,
  className = null,
}) => {
  return (
    <div
      className={
        'flex duration-200 gap-x-2 items-center justify-between px-2 py-1 border rounded-lg' +
        (active
          ? ' border-primary bg-blue-200'
          : ' border-gray-700 bg-gray-200') +
        (disabled
          ? ' border-gray-500'
          : ' cursor-pointer  hover:border-toxic') +
        (className ? ' ' + className : '')
      }
      onClick={() => {
        if (!disabled) onClick()
      }}
    >
      <div
        className="flex-1"
        //  className={active ? 'text-primary' : 'text-gray-700'}
      >
        {title}
      </div>
      {text && (
        <div
          className="text-gray-600"
          //  className={active ? 'text-primary' : 'text-gray-700'}
        >
          {text}
        </div>
      )}
      {!disabled && (
        <FontAwesomeIcon
          className={
            'w-3 h-3 duration-300 transform ' +
            (active
              ? ' rotate-0 laptop:-rotate-90'
              : ' -rotate-180 laptop:rotate-0')
          }
          icon={faChevronDown}
        />
      )}
    </div>
  )
}

const FormMenu = ({ twoCols = false, config = null }) => {
  const tailwindWidth = useWindowDimensionsTailwind()

  const [activeFormItemIndex, setActiveFormItemIndex] = useState(
    config ? config.findIndex((item) => item.visible && !item.disabled) : 0
  )
  return (
    <>
      {twoCols && tailwindWidth > 3 && (
        <FormColumn className="justify-start">
          {config.map((item, index) => {
            if (!item.visible) return null
            return (
              <FormMenuItem
                key={'formMenu' + index}
                onClick={() => setActiveFormItemIndex(index)}
                title={item.title}
                active={index === activeFormItemIndex}
                text={item.text}
                disabled={item.disabled}
              />
            )
          })}
        </FormColumn>
      )}
      <FormColumn>
        <div
          className={
            'flex flex-1 flex-col' +
            (twoCols && tailwindWidth > 3 ? '' : ' gap-y-2')
          }
        >
          {/* <Content /> */}
          {config.map((item, index) => {
            if (!item.visible && !item.disabled) return null
            const ItemContent = item.content
            const active = index === activeFormItemIndex
            return (
              <div
                key={'formMenu2' + index}
                className={'flex flex-col' + (active ? ' flex-1' : '')}
              >
                {(!twoCols || tailwindWidth <= 3) && (
                  <FormMenuItem
                    onClick={() =>
                      setActiveFormItemIndex(
                        activeFormItemIndex === index ? null : index
                      )
                    }
                    title={item.title}
                    active={active}
                    text={item.text}
                    disabled={item.disabled}
                    className={active ? 'rounded-b-none' : ''}
                  />
                )}
                <div
                  className={
                    'border-primary bg-blue-100 ease-out duration-200 flex-1' +
                    (active
                      ? ' ease-in max-h-200 px-2 py-1' +
                        (twoCols && tailwindWidth > 3
                          ? ' border rounded-lg'
                          : ' rounded-b-lg border-b border-l border-r')
                      : ' ease-out max-h-0 overflow-hidden opacity-0')
                  }
                >
                  <div
                    className={
                      'duration-200' +
                      (index === activeFormItemIndex
                        ? ' ease-in scale-y-100'
                        : ' ease-out scale-y-0 -translate-y-1/2')
                    }
                  >
                    {ItemContent}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </FormColumn>
    </>
  )
}

const ClientContent = ({
  form,
  updateForm,
  modals,
  state,
  role,
  readOnly,
  access,
}) => {
  const { clients } = state
  const operator = ['operator', 'dev', 'admin'].includes(role)
  // const aerodesigner = ['aerodesigner', 'dev', 'admin'].includes(role)
  // const deliver = ['deliver', 'dev', 'admin'].includes(role)
  const client = clients.find((client) => client._id === form.clientId)

  const editClient = () => modals.openClientModal(client)

  const addClient = () =>
    modals.openClientModal(undefined, (client) =>
      updateForm({
        clientId: client._id,
      })
    )
  return (
    operator && (
      <div className="flex items-center gap-x-1">
        <SelectClient
          onChange={(client) =>
            updateForm({
              clientId: client._id,
            })
          }
          selectedId={form.clientId}
          required
          className="flex-1"
          // exceptedIds={selectedItemsIds}
          readOnly={readOnly}
        />
        {!readOnly && access.clients.edit(client) && form.clientId && (
          <CardButton
            icon={faPencilAlt}
            className="h-10 mt-6 rounded-lg bg-primary"
            inverse
            onClick={editClient}
            tooltip="Редактировать клиента"
          />
        )}
        {!readOnly && access.clients.add && (
          <CardButton
            icon={faPlus}
            className="h-10 mt-6 rounded-lg bg-primary"
            inverse
            onClick={addClient}
            tooltip="Создать нового клиента"
          />
        )}
      </div>
    )
  )
}

const DeliveryContent = ({ readOnly, form, updateForm, role, access }) => {
  const operator = ['operator', 'dev', 'admin'].includes(role)
  const aerodesigner = ['aerodesigner', 'dev', 'admin'].includes(role)
  const deliver = ['deliver', 'dev', 'admin'].includes(role)
  const handleAddressChange = (name, value) => {
    updateForm({
      deliveryAddress: { ...form.deliveryAddress, [name]: value },
    })
  }
  return (
    <>
      {(operator || aerodesigner) && (
        <div className="flex gap-x-6">
          <label
            className={
              'min-w-min whitespace-nowrap' +
              (readOnly ? ' border-b-1 border-primary' : '')
            }
            htmlFor={'deliveryPickup'}
          >
            Тип доставки{readOnly && ':'}
          </label>
          <div className="flex flex-wrap gap-x-4">
            <RadioBox
              checked={form.deliveryPickup}
              onClick={(e) =>
                updateForm({
                  deliveryPickup: e.target.value === 'on',
                })
              }
              small
              label="Самовывоз"
              readOnly={readOnly}
              // className="flex-1"
              // labelPos="left"
            />
            <RadioBox
              checked={!form.deliveryPickup}
              onClick={(e) =>
                updateForm({
                  deliveryPickup: e.target.value !== 'on',
                })
              }
              small
              label="Курьером"
              readOnly={readOnly}
              // className="flex-1"
              // labelPos="left"
            />
          </div>
        </div>
      )}
      {(operator || deliver) && (
        <div className="w-full h-auto">
          <RowContainer className="flex-col justify-between tablet:flex-nowrap min-w-72 tablet:min-w-none tablet:flex-row desktop:max-w-none">
            <DateTimePicker
              key="deliveryDateFrom"
              label={form.deliveryPickup ? 'Самовывоз в' : 'Доставка от'}
              name="deliveryDateFrom"
              value={form.deliveryDateFrom}
              onChange={(deliveryDateFrom) => updateForm({ deliveryDateFrom })}
              required
              readOnly={readOnly || role === 'deliver'}
            />
            <div
              className={
                'duration-75 overflow-hidden h-auto' +
                (form.deliveryPickup ? ' delay-300 max-h-0' : ' max-h-100')
              }
            >
              <DateTimePicker
                key="deliveryDateTo"
                label="до"
                name="deliveryDateTo"
                value={form.deliveryDateTo}
                onChange={(deliveryDateTo) => updateForm({ deliveryDateTo })}
                required
                readOnly={readOnly || role === 'deliver'}
              />
            </div>
          </RowContainer>
          <div
            className={
              'w-full duration-300 overflow-hidden h-auto' +
              (form.deliveryPickup
                ? ' ease-out max-h-0'
                : ' ease-in duration-1000 max-h-1000')
            }
          >
            {/* {operator && (
              <SelectDeliver
                onChange={(item) =>
                  setForm({
                    ...form,
                    deliverId: item._id,
                  })
                }
                selectedId={form.deliverId}
                required
                // exceptedIds={selectedItemsIds}
              />
            )} */}
            <div>
              {role === 'deliver' ? (
                'Адрес: ' + formatDeliveryAddress(form.deliveryAddress)
              ) : (
                <>
                  <label>
                    Адрес<span className="text-red-700">*</span>
                  </label>
                  <div className="flex flex-col p-1 border border-gray-700 rounded-lg gap-y-2">
                    <Input
                      key="town"
                      label="Город"
                      type="text"
                      maxLength="100"
                      value={form.deliveryAddress.town}
                      onChange={(value) => handleAddressChange('town', value)}
                      className="flex-1"
                      labelStyle="w-18"
                      inLine
                      required
                      readOnly={readOnly || role === 'deliver'}
                    />
                    <SelectDistrict
                      onChange={(item) =>
                        updateForm({
                          deliveryPrice: item?.deliveryPrice ?? 0,
                          deliveryAddress: {
                            ...form.deliveryAddress,
                            district: item,
                          },
                        })
                      }
                      selectedId={form.deliveryAddress.district?._id}
                      required
                      readOnly={readOnly || role === 'deliver'}
                      // exceptedIds={selectedItemsIds}
                    />
                    <RowContainer className="flex-col tablet:flex-row gap-y-2">
                      <Input
                        key="street"
                        label="Улица"
                        type="text"
                        maxLength="100"
                        value={form.deliveryAddress.street}
                        onChange={(value) =>
                          handleAddressChange('street', value)
                        }
                        className="flex-1"
                        labelStyle="w-18"
                        inLine
                        required
                        readOnly={readOnly || role === 'deliver'}
                      />
                      <Input
                        key="house"
                        label="Дом"
                        type="text"
                        maxLength="100"
                        value={form.deliveryAddress.house}
                        onChange={(value) =>
                          handleAddressChange('house', value)
                        }
                        // className="w-80"
                        labelStyle="w-18 pr-1 tablet:w-min"
                        inputStyle="w-16"
                        inLine
                        required
                        readOnly={readOnly || role === 'deliver'}
                      />
                    </RowContainer>
                    <RowContainer className="flex-col tablet:flex-row gap-y-2">
                      <Input
                        key="entrance"
                        type="text"
                        label="Подъезд"
                        maxLength="10"
                        value={form.deliveryAddress.entrance}
                        onChange={(value) =>
                          handleAddressChange('entrance', value)
                        }
                        inLine
                        labelStyle="w-18 pr-1 tablet:w-min"
                        inputStyle="tablet:w-16"
                        readOnly={readOnly || role === 'deliver'}
                      />
                      <Input
                        key="floor"
                        type="text"
                        label="Этаж"
                        maxLength="10"
                        value={form.deliveryAddress.floor}
                        onChange={(value) =>
                          handleAddressChange('floor', value)
                        }
                        inLine
                        labelStyle="w-18 pr-1 tablet:w-min"
                        inputStyle="tablet:w-16"
                        readOnly={readOnly || role === 'deliver'}
                      />
                      <Input
                        key="flat"
                        type="text"
                        label="Квартира"
                        maxLength="10"
                        value={form.deliveryAddress.flat}
                        onChange={(value) => handleAddressChange('flat', value)}
                        inLine
                        labelStyle="pr-1 tablet:w-min"
                        inputStyle="tablet:w-16"
                        required
                        readOnly={readOnly || role === 'deliver'}
                      />
                    </RowContainer>
                    <Input
                      key="comment"
                      label="Комментарий по адресу"
                      type="text"
                      maxLength="300"
                      value={form.deliveryAddress.comment}
                      onChange={(value) =>
                        handleAddressChange('comment', value)
                      }
                      textarea
                      readOnly={readOnly || role === 'deliver'}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const ResponsibleContent = ({ form, updateForm, role, readOnly }) => {
  const admin = ['dev', 'admin'].includes(role)
  const operator = ['operator', 'dev', 'admin'].includes(role)
  // const aerodesigner = ['aerodesigner', 'dev', 'admin'].includes(role)
  // const deliver = ['deliver', 'dev', 'admin'].includes(role)
  const handleAddressChange = (e) => {
    const { value, name } = e.target
    updateForm({ deliveryAddress: { ...form.deliveryAddress, [name]: value } })
  }
  return (
    <>
      {admin && (
        <SelectOperator
          onChange={(operator) =>
            updateForm({
              operatorId: operator._id,
            })
          }
          selectedId={form.operatorId}
          required
          readOnly={readOnly}
          // exceptedIds={selectedItemsIds}
        />
      )}
      {operator && (
        <SelectAerodesigner
          onChange={(aerodesigner) =>
            updateForm({
              aerodesignerId: aerodesigner._id,
            })
          }
          selectedId={form.aerodesignerId}
          required
          className="mb-2"
          readOnly={readOnly}
          // exceptedIds={selectedItemsIds}
        />
      )}
      {operator && (
        <SelectDeliver
          onChange={(deliver) =>
            updateForm({
              deliverId: deliver._id,
            })
          }
          selectedId={form.deliverId}
          required
          readOnly={readOnly}
          // exceptedIds={selectedItemsIds}
        />
      )}
    </>
  )
}

const ProductsContent = ({ form, updateForm, role, readOnly }) => {
  const operator = ['operator', 'dev', 'admin'].includes(role)
  const aerodesigner = ['aerodesigner', 'dev', 'admin'].includes(role)
  // const deliver = ['deliver', 'dev', 'admin'].includes(role)

  const productsIdCount = form.productsCount.reduce((total, productCount) => {
    return {
      ...total,
      [productCount.product ? productCount.product._id : '?']:
        productCount.count,
    }
  }, {})
  const setsIdCount = form.setsCount.reduce((total, setCount) => {
    return {
      ...total,
      [setCount.set ? setCount.set._id : '?']: setCount.count,
    }
  }, {})

  return (
    (operator || aerodesigner) && (
      <div>
        <SelectProductsList
          productsIdCount={productsIdCount}
          onChange={(productsCount) => updateForm({ productsCount })}
          callbackArray
          required={
            (!setsIdCount['?'] && Object.keys(setsIdCount).length > 0) ||
            (setsIdCount['?'] && Object.keys(setsIdCount).length > 1)
              ? 'star'
              : true
          }
          readOnly={readOnly}
        />
        <SelectSetsList
          setsIdCount={setsIdCount}
          onChange={(setsCount) => updateForm({ setsCount })}
          callbackArray
          required={
            (!productsIdCount['?'] &&
              Object.keys(productsIdCount).length > 0) ||
            (productsIdCount['?'] && Object.keys(productsIdCount).length > 1)
              ? 'star'
              : true
          }
          readOnly={readOnly}
        />
        <Input
          key="comment"
          label={
            'Комментарий по заказу' +
            (role === 'aerodesigner' ? '' : ' (для аэродизайнера)')
          }
          type="text"
          maxLength="600"
          name="comment"
          value={form.comment}
          onChange={(comment) => updateForm({ comment })}
          textarea
          readOnly={readOnly}
        />
      </div>
    )
  )
}

const PaymentContent = ({
  form,
  order,
  totalPaymentsSum,
  updateForm,
  role,
  readOnly,
  catalogPrice,
  totalPrice,
  paymentsId,
  setPaymentsId,
  modals,
}) => {
  const operator = ['operator', 'dev', 'admin'].includes(role)

  const handleChangeDiscount = (value) => {
    const discountValue = Math.ceil(catalogPrice * value) / 100
    updateForm({ discount: discountValue })
  }

  const onDeletePayment = (id) => {
    const tempPaymentsId = paymentsId.filter((paymentId) => paymentId !== id)
    setPaymentsId(tempPaymentsId)
  }

  return (
    operator && (
      <div className="flex flex-col gap-y-1">
        <div>Cумма по каталогу: {catalogPrice} ₽</div>
        <div className="flex gap-x-2">
          <PriceInput
            value={form.discount}
            onChange={(discount) => updateForm({ discount })}
            label="Скидка"
            // className="w-full"
            name="discount"
            labelStyle="w-min pr-1 whitespace-nowrap"
            inLine
            readOnly={readOnly}
          />
          <Input
            value={
              catalogPrice > 0
                ? Math.ceil((form.discount / catalogPrice) * 100) / 100
                : 0
            }
            type="number"
            onChange={handleChangeDiscount}
            postfix="%"
            // label="Скидка"
            inputStyle="max-w-20"
            name="discount"
            inLine
            readOnly={readOnly}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <PriceInput
            value={form.deliveryPrice}
            onChange={(deliveryPrice) => updateForm({ deliveryPrice })}
            label="Доставка"
            // className="w-full"
            name="deliveryPrice"
            labelStyle="w-min pr-1 whitespace-nowrap"
            inLine
            readOnly={readOnly}
          />
          <div>
            по умолчанию:{' '}
            {(form.deliveryAddress?.district?.deliveryPrice ?? 0) / 100} ₽
          </div>
        </div>
        {order._id ? (
          <SelectPaymentList
            paymentsId={paymentsId}
            onChange={setPaymentsId}
            onCreateNew={(index) =>
              modals.openPaymentModal(
                {
                  ...DEFAULT_PAYMENT,
                  orderId: order._id,
                  clientId: form.clientId ? form.clientId : '',
                },
                (data) => {
                  const tempPaymentsId = [...paymentsId]
                  tempPaymentsId.push(data._id)
                  setPaymentsId(tempPaymentsId)
                },
                (id) => onDeletePayment(id)
              )
            }
            // onEdit={(index, payment) =>
            //   modals.openPaymentModal(payment, (data) => {
            //     const tempPaymentsId = [...paymentsId]
            //     tempPaymentsId[index] = data._id
            //     setPaymentsId(tempPaymentsId)
            //   })
            // }
            // onDelete={(payment, onConfirm) => {
            //   payment
            //     ? modals.openDeletePayment(payment, onConfirm)
            //     : onConfirm()
            // }}
            onClick={(index, payment) =>
              modals.openPaymentModal(
                payment,
                (data) => {
                  const tempPaymentsId = [...paymentsId]
                  tempPaymentsId[index] = data._id
                  setPaymentsId(tempPaymentsId)
                },
                (id) => onDeletePayment(id)
              )
            }
            dropDownList={false}
            readOnly={readOnly}
          />
        ) : (
          <div>
            <label htmlFor="itemsIds">Транзакции</label>
            <div>Чтобы добавить транзакции - сначала сохраните заказ</div>
          </div>
        )}
        <div className="flex items-end justify-center flex-1 gap-x-1">
          <span className="text-lg">Итого сумма:</span>
          <span className="text-lg font-bold ">{totalPrice}</span> ₽
        </div>
        {totalPaymentsSum ? (
          <div className="flex justify-between">
            <div className="flex items-end justify-center flex-1 gap-x-1">
              <span className="text-md">Оплачено:</span>
              <span className="font-bold text-md ">{totalPaymentsSum}</span> ₽
            </div>
            <div className="flex items-end justify-center flex-1 gap-x-1">
              <span className="text-md">
                {totalPrice - totalPaymentsSum >= 0
                  ? 'Остаток'
                  : ' из них чаевые'}
                :
              </span>
              <span className="font-bold text-md ">
                {Math.abs(totalPrice - totalPaymentsSum)}
              </span>{' '}
              ₽
            </div>
          </div>
        ) : null}
      </div>
    )
  )
}

const ProductCirculationContent = ({
  form,
  updateForm,
  role,
  productCirculationsIdCountDefective,
  setProductCirculationsIdCountDefective,
  productCirculationsIdCount,
  setProductCirculationsIdCount,
  readOnly,
}) => {
  // const operator = ['operator', 'dev', 'admin'].includes(role)
  // const aerodesigner = ['aerodesigner', 'dev', 'admin'].includes(role)
  // const deliver = ['deliver', 'dev', 'admin'].includes(role)

  const productCirculationIdCountGenerator = () => {
    const tempProductCirculationsIdCount = {}
    form.productsCount.forEach(
      (productCount) =>
        (tempProductCirculationsIdCount[productCount.product._id] =
          productCount.count)
    )
    form.setsCount.forEach((setCount) => {
      for (const [productId, count] of Object.entries(
        setCount.set.productsIdCount
      )) {
        if (tempProductCirculationsIdCount[productId])
          tempProductCirculationsIdCount[productId] += count * setCount.count
        else tempProductCirculationsIdCount[productId] = count * setCount.count
      }
    })
    setProductCirculationsIdCount(tempProductCirculationsIdCount)
  }

  return (
    <div>
      {!readOnly && (
        <IconButton
          name="Генерировать из состава заказа"
          onClick={productCirculationIdCountGenerator}
          inverse
          icon={faCog}
          small
          readOnly={readOnly}
        />
      )}
      <SelectProductsList
        title="Список израсходованных товаров"
        productsIdCount={productCirculationsIdCount}
        onChange={(newProductsIdCount) => {
          setProductCirculationsIdCount(newProductsIdCount)
          updateForm({})
        }}
        readOnly={readOnly}
      />
      <SelectProductsList
        title="Список отбракованных товаров"
        productsIdCount={productCirculationsIdCountDefective}
        onChange={(newProductsIdCount) => {
          setProductCirculationsIdCountDefective(newProductsIdCount)
          // TODO Очень странная фигняююю без строчки ниже компонент не обновляется если добавить новый товар
          updateForm({})
        }}
        readOnly={readOnly}
      />
    </div>
  )
}

const PhotosContent = ({ form, setForm, readOnly }) => {
  return (
    <div>
      <InputImages
        images={form.photos}
        label="Фотографии"
        onChange={(photos) =>
          updateForm({
            photos,
          })
        }
        // readOnly={readOnly}
        directory="order_photos"
        maxImages={10}
        readOnly={readOnly}
      />
    </div>
  )
}

const OrderForm = ({
  loggedUser,
  order = DEFAULT_ORDER,
  afterConfirm = () => {},
  onClose = () => {},
  editMode = false,
}) => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    number: order.number,
    clientId: order.clientId,
    productsCount: order.productsCount,
    setsCount: order.setsCount,
    discount: order.discount,
    price: order.price,
    status: order.status,
    comment: order.comment,
    photos: order.photos,
    deliveryPrice: order.deliveryPrice,
    deliveryPickup: order.deliveryPickup,
    deliveryAddress: order.deliveryAddress,
    deliveryDateFrom: order.deliveryDateFrom,
    deliveryDateTo: order.deliveryDateTo,
    deliverId: order.deliverId,
    aerodesignerId: order.aerodesignerId,
    operatorId: order.operatorId,
  })

  const updateForm = (data) => setForm({ ...form, ...data })

  const [paymentsId, setPaymentsId] = useState([])

  const [productCirculationsIdCount, setProductCirculationsIdCount] = useState(
    {}
  )
  const [
    productCirculationsIdCountDefective,
    setProductCirculationsIdCountDefective,
  ] = useState({})

  const state = useSelector((state) => state)
  const { products, sets, users, clients, productCirculations, payments } =
    state

  const dispatch = useDispatch()

  const modals = modalsFunctions(dispatch, state, loggedUser)

  useEffect(() => {
    const tempProductCirculationsIdCount = {}
    const tempProductCirculationsIdCountDefective = {}
    if (order._id) {
      // Перебираем ProductCirculations и ищем тавары связанные с заказом
      productCirculations
        .filter(
          (productCirculation) => productCirculation.orderId === order._id
        )
        .forEach((productCirculation) => {
          if (productCirculation.defective)
            tempProductCirculationsIdCountDefective[
              productCirculation.productId
            ] = productCirculation.count
          else
            tempProductCirculationsIdCount[productCirculation.productId] =
              productCirculation.count
        })
    }
    setProductCirculationsIdCount(tempProductCirculationsIdCount)
    setProductCirculationsIdCountDefective(
      tempProductCirculationsIdCountDefective
    )

    const tempPayments = payments
      .filter((payment) => payment.orderId === order._id)
      .map((payment) => payment._id)
    setPaymentsId(tempPayments)
  }, [])

  // const session = getSession().then((data) => console.log(data))

  // console.log(`session`, session)

  const delivers = users.filter((user) => user.role === 'deliver')
  const operators = users.filter((user) => user.role === 'operator')
  const aerodesigners = users.filter((user) => user.role === 'aerodesigner')

  useEffect(() => {
    if (
      (operators.length === 1 && !form.operatorId) ||
      (delivers.length === 1 && !form.deliverId) ||
      (aerodesigners.length === 1 && !form.aerodesignerId)
    ) {
      const toForm = {}
      if (delivers.length === 1 && !form.deliverId)
        toForm.deliverId = delivers[0]._id

      if (operators.length === 1 && !form.operatorId)
        toForm.operatorId = operators[0]._id

      if (aerodesigners.length === 1 && !form.aerodesignerId)
        toForm.aerodesignerId = aerodesigners[0]._id

      updateForm(toForm)
    }
  }, [])

  const forNew = order._id === undefined

  const accessToContent = loggedUser.access.orders
  const canAdd = accessToContent.add
  const canEdit = accessToContent.edit(order) && editMode

  const readOnly = (forNew && !canAdd) || (!forNew && !canEdit)

  const catalogProductsPrice = form.productsCount.reduce(
    (totalProductsCount, productCount) => {
      if (productCount.product) {
        const product = products.find(
          (product) => product._id === productCount.product._id
        )
        if (product) totalProductsCount += product.price * productCount.count
      }
      return totalProductsCount
    },
    0
  )
  const catalogSetsPrice = form.setsCount.reduce((totalSetsPrice, setCount) => {
    if (setCount.set) {
      const set = sets.find((set) => set._id === setCount.set._id)
      if (set) totalSetsPrice += set.price * setCount.count
    }
    return totalSetsPrice
  }, 0)
  const catalogPrice = (catalogProductsPrice + catalogSetsPrice) / 100
  const totalPrice =
    catalogPrice +
    (!form.deliveryPickup && form.deliveryPrice
      ? form.deliveryPrice / 100
      : 0) -
    form.discount / 100

  const totalPaymentsSum =
    payments.reduce((prev, current) => {
      if (paymentsId.includes(current._id)) return prev + current.sum
      return prev
    }, 0) / 100

  const createProductCirculationsForOrder = (orderId) => {
    deleteData(
      '/api/productcirculations/order/' + orderId
      // , () =>
      //   fetchingProductCirculations((result) => dispatch(setProductCirculations(result)))
    )
    if (
      Object.keys(productCirculationsIdCount).length > 0 ||
      Object.keys(productCirculationsIdCountDefective).length > 0
    ) {
      const tempProductCirculationsIdCount = []

      for (const [productId, count] of Object.entries(
        productCirculationsIdCount
      )) {
        tempProductCirculationsIdCount.push({
          ...DEFAULT_PRODUCT_CIRCULATION,
          productId,
          price: 0,
          count,
          orderId,
          purchase: true,
          purchasedAt: new Date().toISOString(),
          defective: false,
        })
      }
      for (const [productId, count] of Object.entries(
        productCirculationsIdCountDefective
      )) {
        tempProductCirculationsIdCount.push({
          ...DEFAULT_PRODUCT_CIRCULATION,
          productId,
          price: 0,
          count,
          orderId,
          purchase: true,
          purchasedAt: new Date().toISOString(),
          defective: true,
        })
      }

      postData('/api/productcirculations', tempProductCirculationsIdCount, () =>
        fetchingProductCirculations((result) =>
          dispatch(setProductCirculations(result, true))
        )
      )
    }
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    const errs = formValidator(form, ordersSchema)
    if (Object.keys(errs).length === 0) {
      forNew
        ? postData(
            '/api/orders',
            { ...form, price: totalPrice * 100 },
            (data) => {
              createProductCirculationsForOrder(data._id)
              afterConfirm(data)
              onClose()
            },
            'Новый Заказ создан',
            'Ошибка при создании заказа для'
          )
        : putData(
            `/api/orders/${order._id}`,
            { ...form, fullPrice: totalPrice * 100 },
            (data) => {
              createProductCirculationsForOrder(data._id)
              afterConfirm(data)
              onClose()
            },
            'Заказ №' + form.number + ' изменен',
            'Ошибка при редактировании заказа №' + form.number
          )
    } else {
      setErrors(errs)
    }
  }

  const operator = ['operator', 'dev', 'admin'].includes(loggedUser.role)
  const aerodesigner = ['aerodesigner', 'dev', 'admin'].includes(
    loggedUser.role
  )
  const deliver = ['deliver', 'dev', 'admin'].includes(loggedUser.role)

  const twoCols =
    loggedUser.role !== 'deliver' && loggedUser.role !== 'aerodesigner'

  const contentParams = {
    state,
    operator,
    readOnly,
    form,
    order,
    updateForm,
    role: loggedUser.role,
    access: loggedUser.access,
    catalogPrice,
    totalPrice,
    modals,
    productCirculationsIdCountDefective,
    setProductCirculationsIdCountDefective,
    productCirculationsIdCount,
    setProductCirculationsIdCount,
    paymentsId,
    setPaymentsId,
    totalPaymentsSum,
  }

  const sumObjectValues = (obj) => {
    var sum = 0
    for (var el in obj) {
      if (obj.hasOwnProperty(el) && el !== '?') {
        sum += parseFloat(obj[el])
      }
    }
    return sum
  }

  const cartEmpty = !(
    (Object.keys(form.productsCount).length !== 0 &&
      (Object.keys(form.productsCount).length > 1 ||
        form.productsCount[0].product)) ||
    (Object.keys(form.setsCount).length !== 0 &&
      (Object.keys(form.setsCount).length > 1 || form.setsCount[0].set))
  )

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? 'Создние заказа'
          : editMode
          ? 'Редактирование заказа №' + form.number
          : 'Заказ №' + form.number
      }
      buttonName={forNew ? 'Создать' : 'Применить'}
      message={message}
      errors={errors}
      buttonDisabled={compareObjects(form, order)}
      twoCols={twoCols}
      componentBeforeButton={
        <>
          <div className="flex items-center justify-center gap-x-6">
            <label
              className={
                'min-w-min whitespace-nowrap' +
                (readOnly ? ' border-b-1 border-primary' : '')
              }
              htmlFor={'deliveryPickup'}
            >
              Статус
            </label>
            <div className="flex flex-col laptop:flex-row laptop:flex-wrap gap-x-4">
              {ORDER_STATUSES.map((status) => {
                if (
                  status.hasOwnProperty('requirements') &&
                  Object.keys(status.requirements).length > 0
                ) {
                  for (const [requirement, value] of Object.entries(
                    status.requirements
                  )) {
                    if (requirement === 'productCirculationsIdCount') {
                      if (
                        Object.keys(productCirculationsIdCount).length === 0 ||
                        (Object.keys(productCirculationsIdCount).length === 1 &&
                          productCirculationsIdCount['?'])
                      )
                        return null
                    } else if (form[requirement] !== value) return null
                  }
                }

                if (
                  status.roles.includes(loggedUser.role) ||
                  loggedUser.role === 'dev'
                )
                  return (
                    <RadioBox
                      key={status.value}
                      checked={form.status === status.value}
                      onClick={() => updateForm({ status: status.value })}
                      small
                      label={status.name}
                      // className="flex-1"
                      // labelPos="left"
                    />
                  )
                return null
              })}
            </div>
          </div>
        </>
      }
      readOnly={readOnly}
    >
      <FormMenu
        twoCols={twoCols}
        config={[
          {
            title: 'Ответственные',
            // text: form.clientId
            //   ? clients.find((client) => client._id === form.clientId)?.name
            //   : 'не выбран',
            content: <ResponsibleContent {...contentParams} />,
            visible: operator,
          },
          {
            title: 'Клиент',
            text: form.clientId
              ? clients.find((client) => client._id === form.clientId)?.name
              : 'не выбран',
            content: <ClientContent {...contentParams} />,
            visible: operator,
          },
          {
            title: 'Состав заказа',
            content: <ProductsContent {...contentParams} />,
            text:
              getNoun(
                form.productsCount.reduce(
                  (totalProductsCount, productCount) => {
                    if (productCount.product)
                      return (totalProductsCount += productCount.count)
                    return totalProductsCount
                  },
                  0
                ),
                'товар',
                'товара',
                'товаров'
              ) +
              ', ' +
              getNoun(
                form.setsCount.reduce((totalSetsCount, setCount) => {
                  if (setCount.set) return (totalSetsCount += setCount.count)
                  return totalSetsCount
                }, 0),
                'набор',
                'набора',
                'наборов'
              ),
            visible: operator || aerodesigner,
          },
          {
            title: 'Доставка',
            content: <DeliveryContent {...contentParams} />,
            text:
              (form.deliveryPickup ? 'Самовывоз' : 'Курьером') +
              ' ' +
              formatDateTime(form.deliveryDateFrom),
            visible: true,
            disabled: loggedUser.role === 'aerodesigner',
          },
          {
            title: 'Расчёт',
            content: <PaymentContent {...contentParams} />,
            text:
              (totalPaymentsSum && totalPaymentsSum >= totalPrice
                ? 'Оплачен '
                : 'Аванс ' + totalPaymentsSum + ' / ') +
              totalPrice +
              (totalPaymentsSum && totalPaymentsSum > totalPrice
                ? ' + Чаевые ' + (totalPaymentsSum - totalPrice)
                : '') +
              ' ₽',
            visible: operator && !cartEmpty,
          },
          {
            title: 'Расход товаров',
            content: <ProductCirculationContent {...contentParams} />,
            // text: form.deliveryPickup ? 'Самовывоз' : 'Курьером',
            text:
              getNoun(
                sumObjectValues(productCirculationsIdCount),
                'товар',
                'товара',
                'товаров'
              ) +
              ', ' +
              sumObjectValues(productCirculationsIdCountDefective) +
              ' брак',
            visible: aerodesigner && !cartEmpty,
            // disabled: loggedUser.role === 'aerodesigner',
          },
          {
            title: 'Контент',
            content: <PhotosContent {...contentParams} />,
            // text: form.deliveryPickup ? 'Самовывоз' : 'Курьером',
            text: getNoun(
              form.photos ? form.photos.length : 0,
              'фотография',
              'фотографии',
              'фотографий'
            ),
            visible: true,
            // disabled: loggedUser.role === 'aerodesigner',
          },
        ]}
      />
    </Form>
  )
}

export default OrderForm
