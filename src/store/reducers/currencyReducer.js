import {
  FETCH_CURRENCY_HISTORICAL_DATA,
  FETCH_CURRENCY_LATEST_DATA
} from "../actions/actionTypes"

initialState = {
  latestData: [],
  historicalData: []
}

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENCY_LATEST_DATA:
      return {
        ...state,
        latestData: action.latestData
      }
    case FETCH_CURRENCY_HISTORICAL_DATA:
      return {
        ...state,
        historicalData: action.historicalData
      }
    default:
      return state
  }
}
