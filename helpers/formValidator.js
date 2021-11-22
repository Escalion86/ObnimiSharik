import emailValidator from './emailValidator'

const formValidator = (form, schema) => {
  if (!form || !schema) return null
  let err = {}
  for (const [key, value] of Object.entries(schema)) {
    if (schema[key].required && schema[key].required[0]) {
      if (
        (schema[key].type === String && !form[key]) ||
        (schema[key].type === Number &&
          !form[key] &&
          // form[key] !== schema[key].default &&
          schema[key].default === null &&
          form[key] !== 0)
      ) {
        err[key] = schema[key].required[1]
      }
      if (
        schema[key].type === Boolean &&
        form[key] !== false &&
        form[key] !== true
      ) {
        err[key] = schema[key].required[1]
      }
    }
    if (schema[key].type === Number && form[key] !== schema[key].default) {
      if (schema[key].min && schema[key].min[0] > form[key]) {
        err[key] = schema[key].min[1]
      }
      if (schema[key].max && schema[key].max[0] < form[key]) {
        err[key] = schema[key].max[1]
      }
    }
    if (schema[key].type === String) {
      if (key === 'email' && form.email && !emailValidator(form.email)) {
        err.email =
          'EMail введен некорректно. Email - это "бла бла бла СОБАКА бла бла ТОЧКА бла бла", а не то что ты написал'
      }
      if (
        schema[key].maxlength &&
        schema[key].maxlength[0] < form[key].length
      ) {
        err[key] = schema[key].maxlength[1]
      }
    }
  }
  return err
}

export default formValidator
