import { chain } from 'lodash'

const YQL_API = 'https://query.yahooapis.com/v1/public/yql'
const CURRENT = 'https://rate.bot.com.tw/xrt/flcsv/0/day'

export async function fetchExchangeRateCurrent() {
  const query = `select * from csv where url = '${CURRENT}'`
  const url = encodeURI(`${YQL_API}?q=${query}&format=json`)
  console.log(url)

  const data = await fetch(url)
    .then(d => d.json())

  return chain(data)
    .get('query.results.row', [])
    .slice(1)
    .map(d => ({
      'symbol': d.col0,
      'cash_rate': d.col12,
      'spot_rate': d.col13
    }))
    .value()
}
