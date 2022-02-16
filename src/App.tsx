import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import ReactGA from 'react-ga'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Footer from './components/Footer'


// Route-based code splitting
const Home = lazy(() => import('./views/Dashboard'))
const Farms = lazy(() => import('./views/Farms'))
const Novaria = lazy(() => import('./views/Novaria'))
// const Dashboard = lazy(() => import('./views/Dashboard'))
const NotFound = lazy(() => import('./views/NotFound'))
const Privacy = lazy(() => import('./views/Privacy'))
const Terms = lazy(() => import('./views/Terms'))
const HomeNew = lazy(() => import('./views/Home'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})


const App: React.FC = () => {

  ReactGA.initialize('UA-206876567-1', {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  }
    );
  ReactGA.pageview(window.location.pathname + window.location.search);
  
  useEagerConnect()
  useFetchPublicData()
  return (
    <Router>
      <ResetCSS />
      
      <Menu style={{ backgroundColor:"black" }}>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
            <GlobalStyle isNovaria={false} />
              <Home />
            </Route>
            <Route path="/home" exact>
            <GlobalStyle isNovaria={false} />
              <HomeNew />
            </Route>
            {/* <Route path="/dashboard">
              <Dashboard />
            </Route> */}
            <Route path="/traderoutes">
            <GlobalStyle isNovaria={false} />
              <Farms />
            </Route>
            {/* <Route path="/pools">
              <Farms tokenMode />
            </Route> */}
            <Route path="/legend-of-novaria">
            <GlobalStyle isNovaria />
              <Novaria />
            </Route>
            <Route path="/privacy">
            <GlobalStyle isNovaria={false} />
              <Privacy />
            </Route>
            <Route path="/terms">
            <GlobalStyle isNovaria={false} />
              <Terms />
            </Route>
            <Route component={NotFound} />
            <GlobalStyle isNovaria={false} />
          </Switch>
          {/* <Bubbles numberOfBubbles={150} /> */}
        </Suspense>
      </Menu>
      <Footer />
    </Router>
  )
}

export default React.memo(App)
