import { combineReducers } from 'redux'
import { history } from './history'
import { summary } from './summary'

const reducer = combineReducers({
  summary,
  history
})

export default reducer
