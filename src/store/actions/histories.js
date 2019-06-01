import {
  FETCH_CONVERT_HISTORY,
  ADD_CONVERT_HISTORY,
  DELETE_CONVERT_HISTORY
} from "./actionTypes"
import DeviceInfo from "react-native-device-info"
import firebase from "react-native-firebase"

export const changeAutoLocation = flag => {
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

export const changeBaseCurrency = code => {
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

export const fetchConvertHistory = data => {
  return {
    type: FETCH_CONVERT_HISTORY,
    data: data
  }
}

export const fechDeviceSettingsFromFirebase = () => {
  // get unique device id
  deviceID = DeviceInfo.getUniqueID()

  return dispatch => {
    return firebase
      .database()
      .ref("/history/" + deviceID)
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

          firebase
            .database()
            .ref(`/${deviceID}/settings/`)
            .set({
              baseCurrency: "AUD",
              convertionHistorySave: true,
              autoLocation: false,
              displayCurrency: { 0: "JPY" },
              loaded: true
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
