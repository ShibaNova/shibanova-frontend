import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import GlobalStyle from './style/Global'
import App from './App'
import ApplicationUpdater from './swapstate/application/updater'
import ListsUpdater from './swapstate/lists/updater'
import MulticallUpdater from './swapstate/multicall/updater'
import TransactionUpdater from './swapstate/transactions/updater'
import ToastListener from './components/ToastListener'
import Providers from './Providers'
import 'inter-ui'

// if ('ethereum' in window) {
//   (window.ethereum as any).autoRefreshOnNetworkChange = false
// }

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
        <ToastListener />
      </>
      <ResetCSS />
      <GlobalStyle />
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root'),
)
