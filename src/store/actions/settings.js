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
import { fetchCurrencyLatestData } from "./index"

const changeConvertionHistorySave = flag => {
  return {
    type: CHANGE_AUTO_CONVERTION_HISTORY_SAVE,
    flag: flag
  }
}

export const changeConvertionHistorySaveFromFirebase = flag => {
  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/settings/`)
      .update({ convertionHistorySave: flag })
      .then(function(snapshot) {
        // update redux aswell
        dispatch(changeConvertionHistorySave(flag))
      })
      .catch(error => {
        throw error
      })
  }
}

const changeAutoLocation = flag => {
  return {
    type: CHANGE_AUTO_LOCATION,
    flag: flag
  }
}

export const changeAutoLocationFromFirebase = flag => {
  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/settings/`)
      .update({ autoLocation: flag })
      .then(function(snapshot) {
        // update redux aswell
        dispatch(changeAutoLocation(flag))
      })
      .catch(error => {
        throw error
      })
  }
}

const changeBaseCurrency = code => {
  return {
    type: CHANGE_BASE_CURRENCY,
    baseCurrency: code
  }
}

export const changeBaseCurrencyFromFirebase = currencyCode => {
  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/settings/`)
      .update({ baseCurrency: currencyCode })
      .then(function(snapshot) {
        // update redux aswell
        dispatch(fetchCurrencyLatestData(currencyCode))
        dispatch(changeBaseCurrency(currencyCode))
      })
      .catch(error => {
        throw error
      })
  }
}

const fetchDeviceSettings = settings => {
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
      .ref(`/${deviceID}/settings/`)
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
              displayCurrency,
              loaded: true
            })
          )
        } else {
          // if there is no setting for the device then create setting with default values

          return firebase
            .database()
            .ref(`/${deviceID}/settings/`)
            .set({
              baseCurrency: "AUD",
              convertionHistorySave: true,
              autoLocation: false,
              displayCurrency: { 0: "JPY" }
            })
            .then(function() {
              // after initial setting fetch data again
              return firebase
                .database()
                .ref(`/${deviceID}/settings/`)
                .once("value")
                .then(function(snapshot) {
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
                })
            })
        }
      })
      .catch(error => {
        throw error
      })
  }
}

const addCurrency = code => {
  return {
    type: ADD_CURRENCY,
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
      .ref(`/${deviceID}/settings/`)
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

const deleteCurrency = code => {
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
