import { chain } from 'lodash'
import { getRecentlyBusinessDay } from './utils'

const YQL_API_URL = 'https://query.yahooapis.com/v1/public/yql'

export async function fetchExchangeRateByDate(date) {
  const byDateUrl = `https://rate.bot.com.tw/xrt/flcsv/0/${date}`
  const query = `select * from csv where url = '${byDateUrl}'`
  const url = `${YQL_API_URL}?q=${query}&format=json`

  const data = await fetch(encodeURI(url))
    .then(d => d.json())

  return chain(data)
    .get('query.results.row', [])
    .slice(1)
    .map(d => ({
      date, 
      symbol: d.col0,
      cash_rate: d.col12,
      spot_rate: d.col13
    }))
    .keyBy('symbol')
    .value()
}

export async function fetchExchangeRateCurrent() {
  const {
    first,
    second
  } = getRecentlyBusinessDay()

  const today = await fetchExchangeRateByDate(first)
  const prevDay = await fetchExchangeRateByDate(second)

  return chain(today)
    .map(d => Object.assign({}, d, {
      'cash_rate_prev': prevDay[d.symbol].cash_rate,
      'spot_rate_prev': prevDay[d.symbol].spot_rate
    }))
    .value()
}

export async function fetchExchangeRateByRange(symbol, range) {
  const byRangeUrl = `https://rate.bot.com.tw/xrt/flcsv/0/${range}/${symbol}`
  const query = `select * from csv where url = '${byRangeUrl}'`
  const url = `${YQL_API_URL}?q=${query}&format=json`

  const data = await fetch(encodeURI(url))
    .then(d => d.json())

  return chain(data)
    .get('query.results.row', [])
    .slice(1)
    .map(d => ({
      'date': d.col0,
      'symbol': d.col1,
      'cash_rate': d.col13,
      'spot_rate': d.col14
    }))
    .value()
}
