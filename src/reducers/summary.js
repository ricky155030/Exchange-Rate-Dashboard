const initialState = {
  data: []
}

export function summary(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_SUMMARY_DATA': 
      return Object.assign({}, state, {
        data: action.data
      })
    default:
      return state
  }
}
