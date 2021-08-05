import React, { useEffect, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import history from './routerHistory'


// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const NotFound = lazy(() => import('./views/NotFound'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    // @ts-ignore: Unreachable code error
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Farms tokenMode />
            </Route>
            <Route component={NotFound} />
            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
