export function roundWithDecimalPoint(num, point) {
  const dPoint = 10 ** point
  return Math.round(num * dPoint) / dPoint
}

export function convertCurrency(inputValue, currencyRate) {
  return inputValue * currencyRate
}
