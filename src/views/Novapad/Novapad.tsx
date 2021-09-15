import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import Header from 'components/Header'
import Divider from './components/Divider'


const Cards = styled(BaseLayout)`
  justify-content: center;
  margin-bottom: 48px;
  margin-top: 32px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 50px;
    padding: 0 25px;
  }

  & > div {
    grid-column: span 8;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.md} {
      grid-column: span 6;
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      grid-column: span 4;
    }
  }
`

const Novapad: React.FC = () => {
  return (
    <Page>
      <Header>NovaPad</Header>
      <Divider />
      <Cards>
     
      </Cards>
    </Page>
  )
}

export default Novapad