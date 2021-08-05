import React from 'react'
import styled from 'styled-components'
import { Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Header from 'components/Header'
import FarmStakingCard from './components/FarmStakingCard'
import Divider from './components/Divider'
import SNovaStakingCard from './components/sNovaStakingCard'

import MoneyedPotCard from './components/MoneyPotCard'

const Cards = styled(BaseLayout)`
  justify-content: center;
  margin-bottom: 48px;
  margin-top: 32px;

  & > div {
    grid-column: span 8;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-column: span 6;
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Header>DASHBOARD</Header>
      <Divider />
      <Cards>
        <FarmStakingCard />
        <SNovaStakingCard />
        <MoneyedPotCard />
      </Cards>
    </Page>
  )
}

export default Home
