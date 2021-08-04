const roleRus = (role) => {
  switch (role) {
    case 'admin':
      return 'Администратор'
    case 'aerodesigner':
      return 'Аэродизайнер'
    case 'deliver':
      return 'Курьер'
    case 'operator':
      return 'Оператор'
    default:
      return 'Клиент'
  }
}

export default roleRus
