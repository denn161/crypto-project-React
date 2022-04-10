import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import CryptoContext from './context/CryptoContext'

ReactDOM.render(
     
      <CryptoContext>
         <App />    
      </CryptoContext>
      ,
    document.getElementById('root'),
)
