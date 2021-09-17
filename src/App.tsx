import React, { useEffect, Suspense, lazy, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import Bubbles from 'components/Bubbles'
import Popups from 'components/Popups'
import Web3ReactManager from 'components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './views/AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './views/RemoveLiquidity/redirects'
import AddLiquidity from './views/AddLiquidity'
import Pool from './views/Pool'
import PoolFinder from './views/PoolFinder'
import RemoveLiquidity from './views/RemoveLiquidity'
import Swap from './views/Swap'
import { RedirectPathToSwapOnly } from './views/Swap/redirects'
import { LanguageContext } from 'hooks/LanguageContext'
import { TranslationsContext } from 'hooks/TranslationsContext'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import './bubbles.scss'
import useGetDocumentTitlePrice from 'hooks/useGetDocumentTitlePrice'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

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

  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  useFetchPublicData()
  useGetDocumentTitlePrice()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
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
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/pool" component={Pool} />
             <Route exact path="/add" component={AddLiquidity} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

              {/* Redirection: These old routes are still used in the code base */}
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

              <Route component={RedirectPathToSwapOnly} />
          </Switch>
          <Bubbles numberOfBubbles={150} />
        </Suspense>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
