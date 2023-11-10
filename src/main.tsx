import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import '@/assets/css/index.scss'

import App from '@/App'
import store from './redux'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <Provider store={store}>
    <HashRouter>
      <App></App>
    </HashRouter>
  </Provider>
)
