export function roundWithDecimalPoint(num, point) {
  const dPoint = 10 ** point
  return Math.round(num * dPoint) / dPoint
}

export function convertCurrency(inputValue, currencyRate) {
  return inputValue * currencyRate
}

export function getComparisonData(latest, last) {
  const comparisonValue = latest - last
  const comparisonRate = (comparisonValue / last) * 100

  const valueState =
    comparisonValue < 0
      ? String(roundWithDecimalPoint(comparisonValue, 3))
      : `+ ${String(roundWithDecimalPoint(comparisonValue, 3))}`
  return {
    value: valueState,
    percentage: `${roundWithDecimalPoint(comparisonRate, 3)} %`,
    positive: comparisonValue >= 0
  }
}
