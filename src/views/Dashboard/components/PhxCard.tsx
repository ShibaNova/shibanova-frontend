import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import {
  useBuyDirect,
  useBuyDirectCost,
  usePhoenixOffChainBal,
  usePhoenixWalletAmt,
  usePhoenixWalletBnb,
  usePhoenixWalletNova,
  useTotalPHXSupply,
} from 'hooks/usePhoenixBalance'
import { Button, Input } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { usePriceBnbBusd, usePriceNovaBnb, usePriceNovaBusd, usePricePhxNova } from '../../../state/hooks'
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
const Actions = styled.div`
  margin-top: 12px;
`

const PhxCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()

  // Get user wallet balance
  const phoenixBalance = getBalanceNumber(useTokenBalance(getPHXAddress()))

  // Get NOVA price
  const novaPrice = usePriceNovaBusd().toNumber()

  // Get PHX price in NOVA
  const phxPrice = usePricePhxNova().toNumber()
  const phxPriceUsd = phxPrice * novaPrice

  const phxBuyDirectPriceInNova = useBuyDirectCost(1) / usePriceNovaBnb().toNumber()

  // Total PHX Minted
  const phoenixSupply = useTotalPHXSupply()

  // Amount of PHX in Phoenix Wallet Amount
  const phoenixWalletPHXBalance = usePhoenixWalletAmt()

  // Circulating Supply = Total PHX minted minus PHX in Phoenix wallet
  const circPhoenix = phoenixSupply ? phoenixSupply.minus(phoenixWalletPHXBalance) : new BigNumber(0)

  const marketCap = phxPriceUsd * getBalanceNumber(circPhoenix)

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
  const phxNavInNova = totalPHXValueInNova / getBalanceNumber(circPhoenix)

  // PHX Price Discrepancy
  const phxPricePercent = (phxPrice - phxNavInNova) / phxPrice
  const phxPricePercentStr = (phxPricePercent * 100).toFixed(2).concat('%')

  // Pending Oracle Action
  let oracleAction = 'NONE'
  if (phxPricePercent < -0.05) {
    oracleAction = 'BUY'
  } else if (phxPricePercent > 0.05) {
    oracleAction = 'SELL'
  }

  const stats = [
    { label: 'Market Cap'.toUpperCase(), value: marketCap, prefix: '$' },
    { label: 'Circulating Supply'.toUpperCase(), value: getBalanceNumber(circPhoenix) },
    {
      label: '$ Balance (OffChain)',
      value: new BigNumber(offChainBalanceInt).toNumber(),
      decimals: 0,
      prefix: '$',
    },
    { label: 'BNB Balance', value: getBalanceNumber(onChainBalanceBnb).toFixed(2) },
    { label: 'NOVA Balance', value: Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(getBalanceNumber(onChainBalanceNova)) },
    { label: 'TOTAL VALUE (NOVA)', value: Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(totalPHXValueInNova) },
    { label: 'NAV (NOVA)', value: phxNavInNova.toFixed(2) },
    { label: 'Market Price (NOVA)', value: phxPrice.toFixed(2) },
    { label: 'Buy Direct Price (NOVA)', value: phxBuyDirectPriceInNova.toLocaleString(undefined, {maximumFractionDigits:2}) },
    { label: 'Price Diff (Market Premium)', value: phxPricePercentStr },
    { label: 'Pending Oracle Action (Sell/Buy +-5%)', value: oracleAction },
  ]

  const [buyAmount, setBuyAmount] = useState(1)
  const buyCost = useBuyDirectCost(buyAmount)
  const buyTotal = buyCost * 10 ** 18

  const { onBuy } = useBuyDirect()

  const handleBuyDirectAmountChange = (e) => {
    setBuyAmount(e.target.validity.valid ? e.target.value : buyAmount)
  }

  const HandleBuyDirect = useCallback(async () => {
    setPendingTx(true)
    try {
      await onBuy(buyTotal, buyAmount)
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [buyAmount, buyTotal, onBuy])

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
      <Actions>
        {account ? (
          <GridRow style={{ marginTop: 20 }}>
            <Input
              style={{ maxWidth: 150 }}
              type="number"
              min="1"
              value={buyAmount}
              onChange={(e) => handleBuyDirectAmountChange(e)}
            />
            <Button onClick={HandleBuyDirect} disabled={pendingTx}>
              Buy Direct: {buyCost.toFixed(3)} BNB
            </Button>
          </GridRow>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Actions>

      <Stats stats={stats} />
    </StatsCard>
  )
}

export default PhxCard
