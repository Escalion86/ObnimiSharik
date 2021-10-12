const formatDeliveryAddress = (deliveryAddress) => {
  if (!deliveryAddress?.town && !deliveryAddress?.street) return 'неизвестен'
  return `${
    deliveryAddress?.town &&
    deliveryAddress.town +
      (deliveryAddress?.street ? ', ' + deliveryAddress.street : '')
  }${
    (deliveryAddress?.house ? deliveryAddress.house : '') +
    (deliveryAddress.house && deliveryAddress.flat
      ? ' - ' + deliveryAddress.flat
      : '')
  }`
}

export default formatDeliveryAddress
