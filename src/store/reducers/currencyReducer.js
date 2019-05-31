import {
  FETCH_CURRENCY_HISTORICAL_DATA,
  FETCH_CURRENCY_LATEST_DATA
} from "../actions/actionTypes"

initialCurrencyState = {
  latestData: [],
  latestDataLoaded: false,
  historicalData: [],
  historicalDataLoaded: false,
  lastCurrencyRate: null
}

function getLastData(historicalData) {
  const DateArray = Object.keys(historicalData)
  const lastDate = DateArray.sort(function(a, b) {
    return new Date(a) - new Date(b)
  })[DateArray.length - 2]

  return Object.values(historicalData[lastDate])[0]
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
        historicalDataLoaded: true,
        lastCurrencyRate: getLastData(action.historicalData)
      }
    default:
      return state
  }
}
