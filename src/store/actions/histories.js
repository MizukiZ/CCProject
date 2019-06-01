import {
  FETCH_CONVERT_HISTORY,
  ADD_CONVERT_HISTORY,
  DELETE_CONVERT_HISTORY
} from "./actionTypes"
import DeviceInfo from "react-native-device-info"
import firebase from "react-native-firebase"

const fetchConvertHistory = data => {
  return {
    type: FETCH_CONVERT_HISTORY,
    data: data
  }
}

export const fetchConvertHistoryFromFirebase = () => {
  // get unique device id
  deviceID = DeviceInfo.getUniqueID()

  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/histories/`)
      .once("value")
      .then(function(snapshot) {
        // if there is an exsisting convertion history for the currenct device
        if (snapshot.val()) {
          // dispatch the mothod to update state
          dispatch(fetchConvertHistory(snapshot.val()))
        }
      })
      .catch(error => {
        throw error
      })
  }
}

const addHistory = data => {
  return {
    type: ADD_CONVERT_HISTORY,
    data: data
  }
}

export const addHistoryFromFirebase = (newHistory, originalHistories) => {
  // create a hash format data to send to firebase
  originalHistories.push(newHistory)
  sendData = {}
  originalHistories.forEach((history, i) => {
    sendData[i] = history
  })

  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/histories/`)
      .update(sendData)
      .then(function(snapshot) {
        // update redux aswell
        dispatch(addHistory(newHistory))
      })
      .catch(error => {
        throw error
      })
  }
}

export const deleteCurrency = code => {
  return {
    type: DELETE_CURRENCY,
    currencyCode: code
  }
}

export const deleteCurrencyFromFirebase = (code, originalList) => {
  // create a hash format data to send to firebase
  sendData = {}
  originalList
    .filter(c => c != code)
    .forEach((currency, i) => {
      sendData[i] = currency
    })

  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/settings/`)
      .update({ displayCurrency: sendData })
      .then(function(snapshot) {
        // update redux aswell
        dispatch(deleteCurrency(code))
      })
      .catch(error => {
        throw error
      })
  }
}
