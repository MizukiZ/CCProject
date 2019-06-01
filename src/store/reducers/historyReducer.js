import {
  FETCH_CONVERT_HISTORY,
  ADD_CONVERT_HISTORY,
  DELETE_CONVERT_HISTORY
} from "../actions/actionTypes"

initialSettingState = {
  Histories: []
}

export default function historyReducer(state = initialSettingState, action) {
  switch (action.type) {
    case FETCH_CONVERT_HISTORY:
      return action.data
    case ADD_CONVERT_HISTORY:
      return {
        Histories: state.Histories.concat(action.data)
      }
    // case DELETE_CONVERT_HISTORY:
    //   return {
    //     ...state,
    //     displayCurrency: state.displayCurrency.filter(currency => {
    //       return currency != action.currencyCode
    //     })
    //   }
    default:
      return state
  }
}
