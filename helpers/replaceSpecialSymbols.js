const replaceSpecialSymbols = (str) =>
  str.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&')

export default replaceSpecialSymbols
