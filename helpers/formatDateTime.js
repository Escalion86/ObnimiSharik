function formatDateTime(dateTime, forComponent = false) {
  if (!dateTime) return undefined
  var d = new Date(dateTime),
    minutes = '' + d.getMinutes(),
    hours = '' + d.getHours(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  if (hours.length < 2) hours = '0' + hours
  if (minutes.length < 2) minutes = '0' + minutes

  if (forComponent)
    return [year, month, day].join('-') + 'T' + [hours, minutes].join(':')
  else return [day, month, year].join('.') + ' ' + [hours, minutes].join(':')
}

export default formatDateTime
