import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import configureStore from './store/configureStore'
import { basename } from './config'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router basename={basename}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
