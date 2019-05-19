import { FETCH_CURRENCY_HISTORICAL_DATA } from "../actions/actionTypes"

export default function currencyReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CURRENCY_HISTORICAL_DATA:
      return action.data
    default:
      return state
  }
}
