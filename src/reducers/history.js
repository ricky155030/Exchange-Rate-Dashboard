const initialState = {}

export function history(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_EXCHANGE_RATE_HISTORICAL_DATA': 
      return Object.assign({}, state, {
        [ action.symbol ]: action.data
      })
    default:
      return state
  }
}
