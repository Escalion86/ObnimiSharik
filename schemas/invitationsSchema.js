const invitationsSchema = {
  email: {
    type: String,
    required: [
      true,
      'Введите EMail. Или ты как решил его пришласить в систему?',
    ],
  },
  role: {
    type: String,
    default: 'client',
  },
  status: {
    type: String,
    default: 'created',
  },
}

export default invitationsSchema
