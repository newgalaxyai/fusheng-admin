import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import AntdProvider from '@/hooks/useAntdApp'

import '@/assets/css/index.scss'

import App from '@/App'
import store from './redux'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <Provider store={store}>
    <HashRouter>
      <AntdProvider>
        <App></App>
      </AntdProvider>
    </HashRouter>
  </Provider>
)
