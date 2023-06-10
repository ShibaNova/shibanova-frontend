import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap-libs/uikit'
import showCountdown from 'utils/countdownTimer'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import HowToPlay from './components/HowToPlay'
import FarmStakingCard from './components/FarmStakingCard'
import SNovaStakingCard from './components/sNovaStakingCard'
import TradeRouteCard from './components/TradeRouteCard'
import SubHero from './components/SubHero'
import NovaEcosystem from './components/NovaEcosystem'
import Banner2 from './components/Banner2'
import NovariaCard from './components/NovariaCard'
import NovariaTeaser from './components/NovariaTeaser'

const Dashboard: React.FC = () => {
  return (
    <Page>
      <SubHero />
      <NovaEcosystem />
      <HowToPlay />
    </Page>
  )
}

export default Dashboard
