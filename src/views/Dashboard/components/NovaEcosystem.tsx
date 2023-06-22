import React from 'react'
import styled from 'styled-components'
import { darkColors } from '@pancakeswap-libs/uikit'
import FarmStakingCard from './FarmStakingCard'
import PhxCard from './PhxCard'
import SNovaStakingCard from './sNovaStakingCard'
import MoneyedPotCard from './MoneyPotCard'
import howto1 from '../assets/howto1.png'
import howto2 from '../assets/howto2.png'
import howto3 from '../assets/howto3.png'
import novaria from '../assets/novariaLogoBig.png'

const Body = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${darkColors.text};
  margin-top: 5px;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: initial;
  }
`

const Heading = styled.div`
  color: ${darkColors.text};
  font-size: 1.3rem;
  margin-top: 15px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Border = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${darkColors.backgroundDisabled};
  border-radius: 5px;
`

const ItemSquare = styled.a`
  height: 250px;
  width: 300px;
  background: #0c0b15;
  border: 1px solid ${darkColors.backgroundDisabled};
  // border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
`

const ItemImg = styled.img`
  width: 70%;
  height: auto;
  margin-right: auto;
  margin-left: auto;
`

const HowToInfo = [
  {
    id: 0,
    title: 'Transfer BNB to your Crypto Wallet',
    img: howto1,
    link: '',
  },
  {
    id: 1,
    title: 'Connect Your Wallet',
    img: howto2,
    link: '',
  },
  {
    id: 2,
    title: 'Buy NOVA Tokens',
    img: howto3,
    link: '',
  },
  {
    id: 3,
    title: 'Start Playing!',
    img: novaria,
    link: '',
  },
]

const NovaEcosystem = () => {
  return (
    <div>
      <Heading>NovaDEX Ecosystem</Heading>
      <Body>
        <FarmStakingCard />
        <PhxCard />
        <SNovaStakingCard />
        <MoneyedPotCard />
      </Body>
    </div>
  )
}
export default NovaEcosystem
