import {
  CHANGE_BASE_CURRENCY,
  CHANGE_AUTO_CONVERTION_HISTORY_SAVE,
  CHANGE_AUTO_LOCATION,
  FETCH_DEVICE_SETTING,
  ADD_CURRENCY,
  DELETE_CURRENCY
} from "../actions/actionTypes"

initialSettingState = {
  baseCurrency: "JPY",
  autoConvertionHistorySave: true,
  autoLocation: false,
  displayCurrency: []
}

export default function settingReducer(state = initialSettingState, action) {
  switch (action.type) {
    case FETCH_DEVICE_SETTING:
      return action.settings
    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.baseCurrency
      }
    case CHANGE_AUTO_CONVERTION_HISTORY_SAVE:
      return {
        ...state,
        autoConvertionHistorySave: action.flag
      }
    case CHANGE_AUTO_LOCATION:
      return {
        ...state,
        autoLocation: action.flag
      }
    case ADD_CURRENCY:
      return {
        ...state,
        displayCurrency: state.displayCurrency.concat(action.currencyCode)
      }
    case DELETE_CURRENCY:
      return {
        ...state,
        displayCurrency: state.displayCurrency.filter(currency => {
          return currency != action.currencyCode
        })
      }
    default:
      return state
  }
}
