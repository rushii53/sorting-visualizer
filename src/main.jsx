import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { ContextProvider } from './contexts/contextProvider.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </ContextProvider>
)
