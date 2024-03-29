import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import './index.css'
import './locale/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center" theme="colored" pauseOnFocusLoss={false} draggable={false} />
  </React.StrictMode>
)
