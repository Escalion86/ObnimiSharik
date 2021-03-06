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
import modalsFunctions from '@admin/modals/modalsFunctions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import IconButton from '@admincomponents/IconButton'
import { fetchingProductCirculations } from '@helpers/fetchers'
import { setProductCirculations } from '@state/actions'

import { useWindowDimensionsTailwind } from '@helpers/useWindowDimensions'
import formatDateTime from '@helpers/formatDateTime'
import formatDeliveryAddress from '@helpers/formatDeliveryAddress'
import getNoun from '@helpers/getNoun'
import formValidator from '@helpers/formValidator'
import ordersSchema from '@schemas/ordersSchema'
import PropValuePicker from './forForms/PropValuePicker/PropValuePicker'

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

  const editClient = () => modals.clients.open(client)

  const addClient = () =>
    modals.clients.open(undefined, (client) =>
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
            tooltip="?????????????????????????? ??????????????"
          />
        )}
        {!readOnly && access.clients.add && (
          <CardButton
            icon={faPlus}
            className="h-10 mt-6 rounded-lg bg-primary"
            inverse
            onClick={addClient}
            tooltip="?????????????? ???????????? ??????????????"
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
            ?????? ????????????????{readOnly && ':'}
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
              label="??????????????????"
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
              label="????????????????"
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
              label={form.deliveryPickup ? '?????????????????? ??' : '???????????????? ????'}
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
                label="????"
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
                '??????????: ' + formatDeliveryAddress(form.deliveryAddress)
              ) : (
                <>
                  <label>
                    ??????????<span className="text-red-700">*</span>
                  </label>
                  <div className="flex flex-col p-1 border border-gray-700 rounded-lg gap-y-2">
                    <Input
                      key="town"
                      label="??????????"
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
                        label="??????????"
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
                        label="??????"
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
                        label="??????????????"
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
                        label="????????"
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
                        label="????????????????"
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
                      label="?????????????????????? ???? ????????????"
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
    <div className="flex flex-col gap-y-1">
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
          readOnly={readOnly}
          // exceptedIds={selectedItemsIds}
        />
      )}
      {operator && !form.deliveryPickup && (
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
    </div>
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
            '?????????????????????? ???? ????????????' +
            (role === 'aerodesigner' ? '' : ' (?????? ??????????????????????????)')
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
    const discountValue = !!parseFloat(value)
      ? Math.ceil(parseFloat(value) * catalogPrice)
      : 0
    updateForm({ discount: discountValue })
  }

  const onDeletePayment = (id) => {
    const tempPaymentsId = paymentsId.filter((paymentId) => paymentId !== id)
    setPaymentsId(tempPaymentsId)
  }

  return (
    operator && (
      <div className="flex flex-col gap-y-1">
        <div>C???????? ???? ????????????????: {catalogPrice} ???</div>
        <div className="flex gap-x-2">
          <PriceInput
            value={form.discount}
            onChange={(discount) => updateForm({ discount })}
            label="????????????"
            // className="w-full"
            name="discount"
            labelStyle="w-min pr-1 whitespace-nowrap"
            inLine
            readOnly={readOnly}
          />
          <Input
            value={
              catalogPrice > 0
                ? Number((form.discount / catalogPrice).toFixed(2))
                : 0
            }
            type="text"
            onChange={handleChangeDiscount}
            postfix="%"
            // label="????????????"
            inputStyle="max-w-24"
            name="discount"
            inLine
            readOnly={readOnly}
            step="0.01"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <PriceInput
            value={form.deliveryPrice}
            onChange={(deliveryPrice) => updateForm({ deliveryPrice })}
            label="????????????????"
            // className="w-full"
            name="deliveryPrice"
            labelStyle="w-min pr-1 whitespace-nowrap"
            inLine
            readOnly={readOnly}
          />
          <div>
            ???? ??????????????????:{' '}
            {(form.deliveryAddress?.district?.deliveryPrice ?? 0) / 100} ???
          </div>
        </div>
        {order._id ? (
          <SelectPaymentList
            paymentsId={paymentsId}
            onChange={setPaymentsId}
            onCreateNew={(index) =>
              modals.payments.open(
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
            //   modals.payments.open(payment, (data) => {
            //     const tempPaymentsId = [...paymentsId]
            //     tempPaymentsId[index] = data._id
            //     setPaymentsId(tempPaymentsId)
            //   })
            // }
            // onDelete={(payment, onConfirm) => {
            //   payment
            //     ? modals.payments.delete(payment, onConfirm)
            //     : onConfirm()
            // }}
            onClick={(index, payment) =>
              modals.payments.open(
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
            <label htmlFor="itemsIds">????????????????????</label>
            <div>?????????? ???????????????? ???????????????????? - ?????????????? ?????????????????? ??????????</div>
          </div>
        )}
        <div className="flex items-end justify-center flex-1 gap-x-1">
          <span className="text-lg">?????????? ??????????:</span>
          <span className="text-lg font-bold ">{totalPrice}</span> ???
        </div>
        {totalPaymentsSum ? (
          <div className="flex justify-between">
            <div className="flex items-end justify-center flex-1 gap-x-1">
              <span className="text-md">????????????????:</span>
              <span className="font-bold text-md ">{totalPaymentsSum}</span> ???
            </div>
            <div className="flex items-end justify-center flex-1 gap-x-1">
              <span className="text-md">
                {totalPrice - totalPaymentsSum >= 0
                  ? '??????????????'
                  : ' ???? ?????? ????????????'}
                :
              </span>
              <span className="font-bold text-md ">
                {Math.abs(totalPrice - totalPaymentsSum)}
              </span>{' '}
              ???
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
          name="???????????????????????? ???? ?????????????? ????????????"
          onClick={productCirculationIdCountGenerator}
          inverse
          icon={faCog}
          small
          readOnly={readOnly}
        />
      )}
      <SelectProductsList
        title="???????????? ?????????????????????????????? ??????????????"
        productsIdCount={productCirculationsIdCount}
        onChange={(newProductsIdCount) => {
          setProductCirculationsIdCount(newProductsIdCount)
          updateForm({})
        }}
        readOnly={readOnly}
      />
      <SelectProductsList
        title="???????????? ?????????????????????????? ??????????????"
        productsIdCount={productCirculationsIdCountDefective}
        onChange={(newProductsIdCount) => {
          setProductCirculationsIdCountDefective(newProductsIdCount)
          // TODO ?????????? ???????????????? ???????????????? ?????? ?????????????? ???????? ?????????????????? ???? ?????????????????????? ???????? ???????????????? ?????????? ??????????
          updateForm({})
        }}
        readOnly={readOnly}
      />
    </div>
  )
}

const PhotosContent = ({ form, updateForm, readOnly }) => {
  return (
    <div>
      <InputImages
        images={form.examplePhotos}
        label="?????????????? ??????????"
        onChange={(examplePhotos) => updateForm({ examplePhotos })}
        // readOnly={readOnly}
        directory="temp"
        maxImages={10}
        readOnly={readOnly}
      />
      <InputImages
        images={form.resultPhotos}
        label="???????????????????? ?????????????? ????????????"
        onChange={(resultPhotos) => updateForm({ resultPhotos })}
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
  setFormChanged = () => {},
}) => {
  const [errors, setErrors] = useState({})
  const [submiting, setSubmiting] = useState(false)

  const initialFormState = {
    number: order.number,
    clientId: order.clientId,
    productsCount: order.productsCount,
    setsCount: order.setsCount,
    discount: order.discount,
    price: order.price,
    status: order.status,
    comment: order.comment,
    resultPhotos: order.resultPhotos,
    examplePhotos: order.examplePhotos,
    deliveryPrice: order.deliveryPrice,
    deliveryPickup: order.deliveryPickup,
    deliveryAddress: order.deliveryAddress,
    deliveryDateFrom: order.deliveryDateFrom ?? new Date().toISOString(),
    deliveryDateTo: order.deliveryDateTo ?? new Date().toISOString(),
    deliverId: order.deliverId,
    aerodesignerId: order.aerodesignerId,
    operatorId: order.operatorId,
  }

  const [form, setForm] = useState(initialFormState)

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
      // ???????????????????? ProductCirculations ?? ???????? ???????????? ?????????????????? ?? ??????????????
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

  const createProductCirculationsForOrder = async (orderId) => {
    await deleteData(
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
          purchase: false,
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
          purchase: false,
          purchasedAt: new Date().toISOString(),
          defective: true,
        })
      }

      await postData(
        '/api/productcirculations',
        tempProductCirculationsIdCount,
        () =>
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
      setSubmiting(true)
      // ?????????????? ?????????????????????? ???????????? ?? ?? ?????????????????????? 0
      const productsCount = form.productsCount.filter(
        (productCount) => productCount.product
      )
      const setsCount = form.setsCount.filter((setCount) => setCount.set)

      forNew
        ? postData(
            '/api/orders',
            { ...form, price: totalPrice * 100, productsCount, setsCount },
            async (data) => {
              await createProductCirculationsForOrder(data._id)
              afterConfirm(data)
              onClose()
            },
            '?????????? ?????????? ????????????',
            () => setSubmiting(false),
            '???????????? ?????? ???????????????? ???????????? ??????'
          )
        : putData(
            `/api/orders/${order._id}`,
            { ...form, price: totalPrice * 100, productsCount, setsCount },
            async (data) => {
              await createProductCirculationsForOrder(data._id)
              afterConfirm(data)
              onClose()
            },
            '?????????? ???' + form.number + ' ??????????????',
            () => setSubmiting(false),
            '???????????? ?????? ???????????????????????????? ???????????? ???' + form.number
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

  const isFormChanged = !compareObjects(form, initialFormState, true)

  useEffect(() => {
    setFormChanged(isFormChanged)
  }, [isFormChanged])

  console.log(`productCirculationsIdCount`, productCirculationsIdCount)

  return (
    <Form
      handleSubmit={handleSubmit}
      title={
        forNew
          ? '?????????????? ????????????'
          : editMode
          ? '???????????????????????????? ???????????? ???' + form.number
          : '?????????? ???' + form.number
      }
      buttonName={forNew ? '??????????????' : '??????????????????'}
      errors={errors}
      buttonDisabled={!isFormChanged}
      twoCols={twoCols}
      componentBeforeButton={
        <PropValuePicker
          value={form.status}
          valuesArray={
            readOnly
              ? ORDER_STATUSES
              : ORDER_STATUSES.filter((status) => {
                  if (!status.roles.includes(loggedUser.role)) return false
                  if (status.requirements) {
                    for (const [key, value] of Object.entries(
                      status.requirements
                    )) {
                      if (key === 'productCirculationsIdCount') {
                        if (
                          (Object.keys(productCirculationsIdCount).length ===
                            0 &&
                            value) ||
                          (Object.keys(productCirculationsIdCount).length > 0 &&
                            !value)
                        )
                          return false
                      } else {
                        if (form[key] !== value) return false
                      }
                    }
                  }
                  return true
                })
          }
          label="????????????"
          onChange={(status) => updateForm({ status })}
          name="status"
          readOnly={readOnly}
          disselectOnSameClick={false}
        />
      }
      readOnly={readOnly}
      submiting={submiting}
    >
      <FormMenu
        twoCols={twoCols}
        config={[
          {
            title: '????????????',
            text: form.clientId
              ? clients.find((client) => client._id === form.clientId)?.name
              : '???? ????????????',
            content: <ClientContent {...contentParams} />,
            visible: operator,
          },
          {
            title: '???????????? ????????????',
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
                '??????????',
                '????????????',
                '??????????????'
              ) +
              ', ' +
              getNoun(
                form.setsCount.reduce((totalSetsCount, setCount) => {
                  if (setCount.set) return (totalSetsCount += setCount.count)
                  return totalSetsCount
                }, 0),
                '??????????',
                '????????????',
                '??????????????'
              ),
            visible: operator || aerodesigner,
          },
          {
            title: '????????????????',
            content: <DeliveryContent {...contentParams} />,
            text:
              (form.deliveryPickup ? '??????????????????' : '????????????????') +
              ' ' +
              formatDateTime(form.deliveryDateFrom),
            visible: true,
            disabled: loggedUser.role === 'aerodesigner',
          },
          {
            title: '????????????',
            content: <PaymentContent {...contentParams} />,
            text:
              (totalPaymentsSum && totalPaymentsSum >= totalPrice
                ? '?????????????? '
                : '?????????? ' + totalPaymentsSum + ' / ') +
              totalPrice +
              (totalPaymentsSum && totalPaymentsSum > totalPrice
                ? ' + ???????????? ' + (totalPaymentsSum - totalPrice)
                : '') +
              ' ???',
            visible: operator && !cartEmpty,
          },
          {
            title: '??????????????????????????',
            // text: form.clientId
            //   ? clients.find((client) => client._id === form.clientId)?.name
            //   : '???? ????????????',
            content: <ResponsibleContent {...contentParams} />,
            visible: operator,
          },
          {
            title: '???????????? ??????????????',
            content: <ProductCirculationContent {...contentParams} />,
            // text: form.deliveryPickup ? '??????????????????' : '????????????????',
            text:
              getNoun(
                sumObjectValues(productCirculationsIdCount),
                '??????????',
                '????????????',
                '??????????????'
              ) +
              ', ' +
              sumObjectValues(productCirculationsIdCountDefective) +
              ' ????????',
            visible: aerodesigner && !cartEmpty,
            // disabled: loggedUser.role === 'aerodesigner',
          },
          {
            title: '??????????????',
            content: <PhotosContent {...contentParams} />,
            // text: form.deliveryPickup ? '??????????????????' : '????????????????',
            text:
              getNoun(
                form.examplePhotos ? form.examplePhotos.length : 0,
                '????????????',
                '??????????????',
                '????????????????'
              ) +
              ', ' +
              getNoun(
                form.resultPhotos ? form.resultPhotos.length : 0,
                '????????????????????',
                '????????????????????',
                '????????????????????'
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
