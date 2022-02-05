import { AbiItem } from 'web3-utils'
import React, { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import MapAbi from 'config/abi/Map.json'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import contracts from 'config/constants/contracts'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'

// Should really be using `process.env.REACT_APP_CHAIN_ID` and `utils.getRpcUrl()` here,
// and point `.env.development` to the BSC testnet, but unfortunately doing so breaks
// the whole web application since it's never been tested on the BSC testnet ... So, for now,
// hardcoding the BSC testnet configuration.
const CHAIN_ID = '97'
const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/' 
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)

const fetchMapData = async (lx: number, ly: number, rx: number, ry: number) => {
  const web3 = new Web3(httpProvider)
  const contract = new web3.eth.Contract(MapAbi as unknown as AbiItem, contracts.map[CHAIN_ID])
  const data = await contract.methods.getCoordinatePlaces(lx, ly, rx, ry).call()
  console.log('map data', data)
  return data
}



const Page = styled.div`
  background-Image: url('/images/novaria/mapBG.jpg');
  background-size: cover;
  font-size: 15px;
  margin-top: -105px;
  color: #5affff;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -75px;
  }
`

const Body = styled.div`
  margin: 10px 50px 10px 150px;
  // fix background later
  background-Image: url('/images/home/starsBackground.jpg');
  background-size: cover;
  height: 500px;
`

const Overview: React.FC = (props) => {
  

  useEffect(() => {
    const fetch = async () => {
      // const data = await fetchMapData(0, 0, NX - 1, NY - 1)
      // setMapData({ x0: 0, y0: 0, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [])


  return (
    <Page>
      <GameHeader>MAP</GameHeader>
    <Body>
      
      <GameMenu />
      
    </Body>
    </Page>
  )
}

export default Overview