const formatDeliveryAddress = (deliveryAddress) => {
  if (!deliveryAddress?.town && !deliveryAddress?.street) return 'неизвестен'
  return `${deliveryAddress?.town && deliveryAddress.town + ', '}${
    deliveryAddress?.street &&
    deliveryAddress?.flat &&
    deliveryAddress.street + ' - ' + deliveryAddress.flat
  }`
}

export default formatDeliveryAddress
