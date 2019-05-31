import {
  FETCH_CURRENCY_HISTORICAL_DATA,
  FETCH_CURRENCY_LATEST_DATA
} from "../actions/actionTypes"

initialCurrencyState = {
  latestData: [],
  latestDataLoaded: false,
  historicalData: [],
  historicalDataLoaded: false
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
    default:
      return state
  }
}
