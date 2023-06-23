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
import { usePriceBnbBusd, usePriceNovaBusd } from '../../../state/hooks'
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

  // Get PHX price
  const novaPrice = usePriceNovaBusd().toNumber()

  // Total PHX Minted
  const phoenixSupply = useTotalPHXSupply()
  const totalPhoenixMinted = getBalanceNumber(phoenixSupply)

  // Amount of PHX in Phoenix Wallet Amount
  const phoenixWalletPHXBalance = usePhoenixWalletAmt()

  // Circulating Supply = Total PHX minted minus PHX in Phoenix wallet
  const circPhoenix = phoenixSupply ? phoenixSupply.minus(phoenixWalletPHXBalance) : new BigNumber(0)

  const marketCap = usePriceNovaBusd().times(circPhoenix)

  // Get Off chain balance
  const offChainBalanceInt = usePhoenixOffChainBal()
  const offChainBalanceInNova = offChainBalanceInt / novaPrice

  // Get On chain balances
  const onChainBalanceBnb = usePhoenixWalletBnb()
  const onChainBalanceNova = usePhoenixWalletNova()

  const onChainBalanceBnbInNova = getBalanceNumber(usePriceBnbBusd().times(onChainBalanceBnb)) / novaPrice
  const totalOnChainBalanceInNova = getBalanceNumber(onChainBalanceNova) + onChainBalanceBnbInNova

  // Total PHX Nova Value
  const totalPHXValueInNova = offChainBalanceInNova + totalOnChainBalanceInNova

  // PHX NAV
  const phxNavInNova = totalPHXValueInNova / getBalanceNumber(circPhoenix);

  const stats = [
    { label: TranslateString(999, 'Market Cap').toUpperCase(), value: getBalanceNumber(marketCap), prefix: '$' },
    { label: TranslateString(536, 'Total Minted'), value: totalPhoenixMinted.toFixed(2) },
    { label: TranslateString(999, 'Circulating Supply').toUpperCase(), value: getBalanceNumber(circPhoenix) },
    {
      label: TranslateString(999, 'OffChain Balance $'),
      value: new BigNumber(offChainBalanceInt).toNumber(),
      prefix: '$',
    },
    { label: TranslateString(999, 'OffChain Balance in NOVA'), value: offChainBalanceInNova.toFixed(2) },
    { label: TranslateString(999, 'OnChain Balance BNB'), value: getBalanceNumber(onChainBalanceBnb).toFixed(2) },
    { label: TranslateString(999, 'OnChain Balance NOVA'), value: getBalanceNumber(onChainBalanceNova).toFixed(2) },
    { label: TranslateString(999, 'Total OnChain in NOVA'), value: totalOnChainBalanceInNova.toFixed(2) },
    { label: TranslateString(999, 'TOTAL PHX Value in NOVA'), value: totalPHXValueInNova.toFixed(2) },
    { label: TranslateString(999, 'PHX NAV in NOVA'), value: phxNavInNova.toFixed(2) },
  ]

  return (
    <StatsCard title="PHX Stats">
      <GridRow>
        <CardImage src="/images/tokens/phoenix2.png" alt="phoenix logo" width={80} height={80} />
        <Col>
          <Block>
            <Label>PHX Balance (${(novaPrice * phoenixBalance).toFixed(2)})</Label>
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
