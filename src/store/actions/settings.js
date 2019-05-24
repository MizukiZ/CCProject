import {
  CHANGE_AUTO_CONVERTION_HISTORY_SAVE,
  CHANGE_AUTO_LOCATION,
  CHANGE_BASE_CURRENCY
} from "./actionTypes"

export const changeAutoConvertionHistorySave = flag => {
  return {
    type: CHANGE_AUTO_CONVERTION_HISTORY_SAVE,
    flag: flag
  }
}

export const changeAutoLocation = flag => {
  return {
    type: CHANGE_AUTO_LOCATION,
    flag: flag
  }
}

export const changeBaseCurrency = code => {
  return {
    type: CHANGE_BASE_CURRENCY,
    baseCurrency: code
  }
}
