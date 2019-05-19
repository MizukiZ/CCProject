import {
  FETCH_CURRENCY_HISTORICAL_DATA,
  FETCH_CURRENCY_LATEST_DATA
} from "./actionTypes"
import axios from "axios"

// function for fomatting JS object
function formatDate(d, subMonth = 0) {
  ;(month = "" + (d.getMonth() + 1 - subMonth)),
    (day = "" + d.getDate()),
    (year = d.getFullYear())

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [year, month, day].join("-")
}

const today = formatDate(new Date())
// date of 2nd params months ago from tody
const monthAgo = formatDate(new Date(), 2)

// Currency api url
const apiLatestDataURL = `https://api.exchangeratesapi.io/latest?base=AUD`

const apiHistoricalDataURL = `https://api.exchangeratesapi.io/history?start_at=${monthAgo}&end_at=${today}&base=AUD&symbols=JPY`

export const fetchLatestData = data => {
  return {
    type: FETCH_CURRENCY_LATEST_DATA,
    latestData: data
  }
}

export const fetchCurrencyLatestData = () => {
  return dispatch => {
    return axios
      .get(apiLatestDataURL)
      .then(response => {
        dispatch(fetchLatestData(response.data.rates))
      })
      .catch(error => {
        throw error
      })
  }
}

export const fetcHistoricalhData = data => {
  return {
    type: FETCH_CURRENCY_HISTORICAL_DATA,
    historicalData: data
  }
}

export const fetchCurrencyHistoricalData = () => {
  return dispatch => {
    return axios
      .get(apiHistoricalDataURL)
      .then(response => {
        dispatch(fetcHistoricalhData(response.data.rates))
      })
      .catch(error => {
        throw error
      })
  }
}
