import {
  FETCH_CURRENCY_HISTORICAL_DATA,
  FETCH_CURRENCY_LATEST_DATA,
  CREATE_CURRENCY_DETAIL_STATEMENT
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

const fetchLatestData = data => {
  return {
    type: FETCH_CURRENCY_LATEST_DATA,
    latestData: data
  }
}

export const fetchCurrencyLatestData = baseCurrency => {
  // Currency api url
  const apiLatestDataURL = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`

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

const fetcHistoricalhData = data => {
  return {
    type: FETCH_CURRENCY_HISTORICAL_DATA,
    historicalData: data
  }
}

const createCurrencyDetailStatement = (
  baseCurrency,
  otherCurrency,
  historicalData
) => {
  return {
    type: CREATE_CURRENCY_DETAIL_STATEMENT,
    data: { baseCurrency, otherCurrency, historicalData }
  }
}

export const fetchCurrencyHistoricalData = (baseCurrency, otherCurrency) => {
  // Currency api url
  const apiHistoricalDataURL = `https://api.exchangeratesapi.io/history?start_at=${monthAgo}&end_at=${today}&base=${baseCurrency}&symbols=${otherCurrency}`

  return dispatch => {
    return axios
      .get(apiHistoricalDataURL)
      .then(response => {
        dispatch(fetcHistoricalhData(response.data.rates))
        dispatch(
          createCurrencyDetailStatement(
            baseCurrency,
            otherCurrency,
            response.data.rates
          )
        )
      })
      .catch(error => {
        throw error
      })
    return Promise.resolve()
  }
}
