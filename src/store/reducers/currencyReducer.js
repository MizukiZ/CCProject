import {
  FETCH_CURRENCY_HISTORICAL_DATA,
  FETCH_CURRENCY_LATEST_DATA,
  CREATE_CURRENCY_DETAIL_STATEMENT
} from "../actions/actionTypes"

import { roundWithDecimalPoint } from "../../helpers/caluculate"
import CountryInfo from "../../assets/counrty_Infomation_handler"

initialCurrencyState = {
  latestData: [],
  latestDataLoaded: false,
  historicalData: [],
  historicalDataLoaded: false,
  generalStatement: null,
  comaprisonStatement: null,
  stateColor: null
}

function getLastDate(historicalData) {
  const DateArray = Object.keys(historicalData)
  const lastDate = DateArray.sort(function(a, b) {
    return new Date(a) - new Date(b)
  })[DateArray.length - 2]

  return lastDate
}

function getStatement(
  baseCurrency,
  otherCurrency,
  historicalData,
  lastDate,
  latestData
) {
  const lastCurrencyRate = Object.values(historicalData[lastDate])[0]

  const comparisonData = getComparisonData(
    latestData[otherCurrency],
    lastCurrencyRate
  )

  const generalState = `1 ${baseCurrency} = ${roundWithDecimalPoint(
    latestData[otherCurrency],
    4
  )}${CountryInfo[otherCurrency].currencySymbol}`
  const comparisonState = `${comparisonData.value}(${
    comparisonData.percentage
  })`
  const color = comparisonData.positive ? "green" : "red"

  return { generalState, comparisonState, color }
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

export default function currencyReducer(state = initialCurrencyState, action) {
  switch (action.type) {
    case FETCH_CURRENCY_LATEST_DATA:
      return {
        ...state,
        latestData: action.latestData,
        latestDataLoaded: true
      }
    case FETCH_CURRENCY_HISTORICAL_DATA:
      return {
        ...state,
        historicalData: action.historicalData,
        historicalDataLoaded: true
      }
    case CREATE_CURRENCY_DETAIL_STATEMENT:
      const lastDate = getLastDate(action.data.historicalData)
      const cStatement = getStatement(
        action.data.baseCurrency,
        action.data.otherCurrency,
        action.data.historicalData,
        lastDate,
        state.latestData
      )
      return {
        ...state,
        generalStatement: cStatement.generalState,
        comaprisonStatement: cStatement.comparisonState,
        stateColor: cStatement.color
      }
    default:
      return state
  }
}
