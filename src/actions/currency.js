import { fetchExchangeRateCurrent, fetchExchangeRateByRange } from '../services/currency'

export const fetchSummaryData = () => async dispatch => {
  const data = await fetchExchangeRateCurrent()
  dispatch(receiveSummaryData(data))
}

export const fetchHistoricalData = symbol => async dispatch => {
  const data = await fetchExchangeRateByRange(symbol, 'L6M')
  dispatch(receiveHistoricalData(symbol, data))
}

// Action Creators
const receiveSummaryData = data => ({
  type: 'RECEIVE_SUMMARY_DATA',
  data
})

const receiveHistoricalData = (symbol, data) => ({
  type: 'RECEIVE_EXCHANGE_RATE_HISTORICAL_DATA',
  data,
  symbol
})
