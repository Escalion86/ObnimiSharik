const accessTable = (user) => {
  if (!user) return false

  return {
    other: {
      page: ['admin', 'dev'].includes(user.role),
      read: (item) => ['admin', 'dev'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    dev: {
      page: ['dev'].includes(user.role),
      read: (item) => ['dev'].includes(user.role),
      edit: (item) => ['dev'].includes(user.role),
      delete: (item) => ['dev'].includes(user.role),
      add: ['dev'].includes(user.role),
    },
    devToDo: {
      page: true,
      read: (item) => true,
      edit: (item) => user._id === item.userId && item.status === 'created',
      delete: (item) => user._id === item.userId && item.status === 'created',
      add: true,
    },
    products: {
      page: ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      read: (item) =>
        ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    sets: {
      page: ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      read: (item) =>
        ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    productTypes: {
      page: ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      read: (item) =>
        ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    setTypes: {
      page: ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      read: (item) =>
        ['admin', 'dev', 'operator', 'aerodesigner'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    productCirculations: {
      page: ['admin', 'dev'].includes(user.role),
      read: (item) => ['admin', 'dev'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    orders: {
      page: true,
      read: (item) => true,
      edit: (item) => true,
      delete: (item) => ['admin', 'dev', 'operator'].includes(user.role),
      add: ['admin', 'dev', 'operator'].includes(user.role),
    },
    users: {
      page: ['admin', 'dev'].includes(user.role),
      read: (item) =>
        ['admin', 'dev'].includes(user.role) &&
        (item.role !== 'dev' || user.role === 'dev'),
      edit: (item) =>
        ['admin', 'dev'].includes(user.role) &&
        (item.role !== 'dev' || user.role === 'dev'),
      delete: (item) =>
        ['admin', 'dev'].includes(user.role) &&
        (item.role !== 'dev' || user.role === 'dev'),
      add: ['admin', 'dev'].includes(user.role),
    },
    clients: {
      page: ['admin', 'dev', 'operator'].includes(user.role),
      read: (item) => ['admin', 'dev', 'operator'].includes(user.role),
      edit: (item) => ['admin', 'dev', 'operator'].includes(user.role),
      delete: (item) => ['admin', 'dev', 'operator'].includes(user.role),
      add: ['admin', 'dev', 'operator'].includes(user.role),
    },
    invitations: {
      page: ['admin', 'dev'].includes(user.role),
      read: (item) => ['admin', 'dev'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    payments: {
      page: ['admin', 'dev'].includes(user.role),
      read: (item) => ['admin', 'dev'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
    districts: {
      page: ['admin', 'dev'].includes(user.role),
      read: (item) => ['admin', 'dev'].includes(user.role),
      edit: (item) => ['admin', 'dev'].includes(user.role),
      delete: (item) => ['admin', 'dev'].includes(user.role),
      add: ['admin', 'dev'].includes(user.role),
    },
  }
}

export default accessTable
