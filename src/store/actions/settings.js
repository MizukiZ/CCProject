import {
  CHANGE_AUTO_CONVERTION_HISTORY_SAVE,
  CHANGE_AUTO_LOCATION,
  CHANGE_BASE_CURRENCY,
  FETCH_DEVICE_SETTING,
  ADD_CURRENCY,
  DELETE_CURRENCY
} from "./actionTypes"
import DeviceInfo from "react-native-device-info"
import firebase from "react-native-firebase"

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

export const fetchDeviceSettings = settings => {
  return {
    type: FETCH_DEVICE_SETTING,
    settings: settings
  }
}

export const fechDeviceSettingsFromFirebase = () => {
  // get unique device id
  deviceID = DeviceInfo.getUniqueID()
  return dispatch => {
    return firebase
      .database()
      .ref("/settings/" + deviceID)
      .once("value")
      .then(function(snapshot) {
        // if there is an exsisting settings for the currenct device
        if (snapshot.val()) {
          // get each value from snapshot
          const {
            baseCurrency,
            convertionHistorySave,
            autoLocation,
            displayCurrency
          } = snapshot.val()

          // dispatch the mothod to update state
          dispatch(
            fetchDeviceSettings({
              baseCurrency,
              convertionHistorySave,
              autoLocation,
              displayCurrency
            })
          )
        } else {
          // if there is no setting for the device then create setting with default values

          firebase
            .database()
            .ref("/settings/" + deviceID)
            .set({
              baseCurrency: "AUD",
              convertionHistorySave: true,
              autoLocation: false,
              displayCurrency: { 0: "JPY" }
            })
        }
      })
      .catch(error => {
        throw error
      })
  }
}

export const addCurrency = code => {
  return {
    type: ADD_CURRENCY,
    currencyCode: code
  }
}

export const deleteCurrency = code => {
  return {
    type: DELETE_CURRENCY,
    currencyCode: code
  }
}

export const addCurrencyFromFirebase = (code, originalList) => {
  // create a hash format data to send to firebase
  originalList.push(code)
  sendData = {}
  originalList.forEach((currency, i) => {
    sendData[i] = currency
  })
  return dispatch => {
    return firebase
      .database()
      .ref("/settings/" + deviceID)
      .update({ displayCurrency: sendData })
      .then(function(snapshot) {
        // update redux aswell
        dispatch(addCurrency(code))
      })
      .catch(error => {
        throw error
      })
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

  console.log("SendData:" + JSON.stringify(sendData))
  return dispatch => {
    return firebase
      .database()
      .ref("/settings/" + deviceID)
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
