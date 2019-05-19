import { FETCH_CURRENCY_HISTORICAL_DATA } from "./actionTypes"
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
const apiURL = `https://api.exchangeratesapi.io/history?start_at=${monthAgo}&end_at=${today}&base=AUD&symbols=JPY`

export const fetchData = data => {
  return {
    type: FETCH_CURRENCY_HISTORICAL_DATA,
    data: data
  }
}

export const fetchCurrencyData = () => {
  return dispatch => {
    return axios
      .get(apiURL)
      .then(response => {
        dispatch(fetchData(response.data.rates))
      })
      .catch(error => {
        throw error
      })
  }
}
