import {
  FETCH_CONVERT_HISTORY,
  ADD_CONVERT_HISTORY,
  DELETE_CONVERT_HISTORY,
  DELETE_ALL_CONVERT_HISTORY
} from "./actionTypes"
import DeviceInfo from "react-native-device-info"
import firebase from "react-native-firebase"
import uuid from "../../helpers/uuid"

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
    // set unique id
    history.id = uuid()
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

const deleteHistory = historyID => {
  return {
    type: DELETE_CONVERT_HISTORY,
    historyID: historyID
  }
}

export const deleteHistoryFromFirebase = (historyID, originalHistories) => {
  // create a hash format data to send to firebase
  sendData = {}
  originalHistories
    .filter(h => h.id != historyID)
    .forEach((history, i) => {
      sendData[i] = history
    })

  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/histories/`)
      .set(sendData)
      .then(function() {
        // update redux aswell
        dispatch(deleteHistory(historyID))
      })
      .catch(error => {
        throw error
      })
  }
}

const deleteAllHistory = () => {
  return {
    type: DELETE_ALL_CONVERT_HISTORY
  }
}

export const deleteAllHistoryFromFirebase = () => {
  return dispatch => {
    return firebase
      .database()
      .ref(`/${deviceID}/histories/`)
      .set({})
      .then(function() {
        // update redux aswell
        dispatch(deleteAllHistory())
      })
      .catch(error => {
        throw error
      })
  }
}
