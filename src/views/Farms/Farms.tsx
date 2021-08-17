import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, NOVA_PER_BLOCK, NOVA_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceNovaBusd, usePriceUsdtBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import Header from 'components/Header'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import TotalValueLockedCard from './components/TotalValueLockedCard'

export interface FarmsProps {
  tokenMode?: boolean
}

const Hero = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  flex-direction: grid;
  margin: auto;
  margin-bottom: 0px;
  padding-top: 15px;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    image-size: 100px;
    height: 150px;
    padding-top: 5px;
    padding-right: 1px;
  }
`
const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  // const TranslateString = useI18n()
  const farmsLP = useFarms()
  const novaPrice = usePriceNovaBusd()
  const bnbPrice = usePriceBnbBusd()
  const usdtPrice = usePriceUsdtBusd()
  const ethPrice = usePriceEthBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [showInactive, setShowInactive] = useState(false)
  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const novaPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === NOVA_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const novaRewardPerBlock = new BigNumber(farm.NovaPerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const novaRewardPerYear = novaRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = novaPrice.times(novaRewardPerYear)
        let totalValue = new BigNumber(farm.isTokenOnly ? farm.tokenAmount : farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        }

        if (farm.quoteTokenSymbol === QuoteToken.NOVA) {
          totalValue = totalValue.times(novaPrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          totalValue = totalValue.times(ethPrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.USDT) {
          totalValue = totalValue.times(usdtPrice)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          novaPrice={novaPrice}
          usdtPrice={usdtPrice}
          ethPrice={ethPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, novaPrice, usdtPrice, ethPrice, ethereum],
  )

  return (
    <Page>
      <Header>{tokenMode ? 'POOLS' : 'FARMS'}</Header>
      <Divider />
      <div>
        <Heading
          as="h4"
          size="lg"
          color="white"
          mb="10px"
          style={{
            textShadow: '2px 2px 12px #00aaff95, -2px -2px 12px #00aaff95 ',
            // textShadow: '2px 2px 12px #FF0000, -2px -2px 12px #FF0000 ',
            textAlign: 'center',
            paddingTop: 20,
            fontSize: 22,
          }}
        >
          {tokenMode
            ? 'Stake Tokens to Earn NOVA'
            : 'NOVA-MATIC/ETH/BTCB/CAKE farms are stored under the "Inactive" tab to remove LP'}
        </Heading>
        <Heading as="h6" color="#00aaff" mb="1.5rem" style={{ textAlign: 'center', fontSize: 16 }}>
          Deposit Fees are distributed to sNOVA holders
        </Heading>
        <FarmTabButtons setShowInactive={setShowInactive} stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
      </div>
      <div>
        <FlexLayout>
          {
            /* eslint-disable */
            !showInactive
              ? stakedOnly
                ? farmsList(stakedOnlyFarms, false)
                : farmsList(activeFarms, false)
              : farmsList(inactiveFarms, true)
          }
        </FlexLayout>
      </div>
    </Page>
  )
}

export default Farms
