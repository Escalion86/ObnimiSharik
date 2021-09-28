function formatDateTime(dateTime, noT = false) {
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

  return (
    [year, month, day].join('-') +
    (noT ? ' ' : 'T') +
    [hours, minutes].join(':')
  )
}

export default formatDateTime
