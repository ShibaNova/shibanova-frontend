import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import {
  usePhoenixOffChainBal,
  usePhoenixWalletAmt,
  usePhoenixWalletBnb,
  usePhoenixWalletNova,
  useTotalPHXSupply,
} from 'hooks/usePhoenixBalance'
import { usePriceBnbBusd, usePriceNovaBusd, usePricePhxNova } from '../../../state/hooks'
import { getPHXAddress } from '../../../utils/addressHelpers'
import { getBalanceNumber } from '../../../utils/formatBalance'
import StatsCard from './StatsCard'
import Stats from './Stats'
import useTokenBalance from '../../../hooks/useTokenBalance'
import PhoenixWalletBalance from './PhoenixWalletBalance'

const Block = styled.div`
  margin-bottom: 0px;
`

const GridRow = styled.div`
  align-items: center;
  display: flex;
  margin-top: 10px;
  justify-content: space-evenly;
  // grid-column-template: 1fr 3fr;
  font-size: 14px;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`

const CardImage = styled.img`
  margin-bottom: 0px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: right;
`

const Label1 = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: right;
`

const PhxCard = () => {
  const TranslateString = useI18n()

  // Get user wallet balance
  const phoenixBalance = getBalanceNumber(useTokenBalance(getPHXAddress()))

  // Get NOVA price
  const novaPrice = usePriceNovaBusd().toNumber()

  // Get PHX price in NOVA
  const phxPrice = usePricePhxNova().toNumber()
  const phxPriceUsd = phxPrice * novaPrice

  // Total PHX Minted
  const phoenixSupply = useTotalPHXSupply()

  // Amount of PHX in Phoenix Wallet Amount
  const phoenixWalletPHXBalance = usePhoenixWalletAmt()

  // Circulating Supply = Total PHX minted minus PHX in Phoenix wallet
  const circPhoenix = phoenixSupply ? phoenixSupply.minus(phoenixWalletPHXBalance) : new BigNumber(0)

  const marketCap = usePriceNovaBusd().times(circPhoenix)

  // Get Off chain balance
  const offChainBalanceInt = usePhoenixOffChainBal() - 445
  const offChainBalanceInNova = offChainBalanceInt / novaPrice

  // Get On chain balances
  const onChainBalanceBnb = usePhoenixWalletBnb()
  const onChainBalanceNova = usePhoenixWalletNova()

  const onChainBalanceBnbInNova = getBalanceNumber(usePriceBnbBusd().times(onChainBalanceBnb)) / novaPrice
  const totalOnChainBalanceInNova = getBalanceNumber(onChainBalanceNova) + onChainBalanceBnbInNova

  // Total PHX Nova Value
  const totalPHXValueInNova = offChainBalanceInNova + totalOnChainBalanceInNova

  // PHX NAV
  const phxNavInNova = totalPHXValueInNova / getBalanceNumber(circPhoenix)

  // PHX Price Discrepancy
  const phxPricePercent = (phxPrice - phxNavInNova) / phxPrice

  // Pending Oracle Action
  let oracleAction = 'NONE';
  if(phxPricePercent < -.05) {
    oracleAction = "BUY"
  }
  else if(phxPricePercent > .05) {
    oracleAction = "SELL"
  }

  const stats = [
    { label: 'PHX Price'.toUpperCase(), value: phxPriceUsd, prefix: '$' },
    { label: 'Market Cap'.toUpperCase(), value: getBalanceNumber(marketCap), prefix: '$' },
    { label: 'Circulating Supply'.toUpperCase(), value: getBalanceNumber(circPhoenix) },
    {
      label: 'PHX Balance $ (OffChain)',
      value: new BigNumber(offChainBalanceInt).toNumber(),
      decimals: 0,
      prefix: '$',
    },
    { label: 'PHX Balance BNB', value: getBalanceNumber(onChainBalanceBnb).toFixed(2) },
    { label: 'PHX Balance NOVA', value: getBalanceNumber(onChainBalanceNova).toFixed(2) },
    { label: 'TOTAL PHX VALUE (NOVA)', value: totalPHXValueInNova.toFixed(2) },
    { label: 'PHX NAV (NOVA)', value: phxNavInNova.toFixed(2) },
    { label: 'PHX Price (NOVA)', value: phxPrice },
    { label: 'Price Diff', value: (phxPricePercent * 100).toFixed(2), suffix: '%' },
    { label: 'Pending Oracle Action', value: oracleAction }
  ]

  return (
    <StatsCard title="PHX Stats">
      <GridRow>
        <CardImage src="/images/tokens/phoenix2.png" alt="phoenix logo" width={80} height={80} />
        <Col>
          <Block>
            <Label>PHX Balance (${(phxPriceUsd * phoenixBalance).toFixed(2)})</Label>
            <Label1>
              &nbsp;
              <PhoenixWalletBalance phoenixBalance={phoenixBalance} />
            </Label1>
          </Block>
        </Col>
      </GridRow>
      <Stats stats={stats} />
    </StatsCard>
  )
}

export default PhxCard
