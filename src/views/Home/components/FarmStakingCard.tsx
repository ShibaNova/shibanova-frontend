import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useNovaHarvest } from 'hooks/useHarvest'
import UnlockButton from 'components/UnlockButton'
import useNovaFarmsWithBalance from 'hooks/useNovaFarmsWithBalance'
import NovaHarvestBalance from './NovaHarvestBalance'
import NovaWalletBalance from './NovaWalletBalance'
import { usePriceNovaBusd, useFarms } from '../../../state/hooks'
import useTokenBalance, { useTotalSupply, useNovaBurnSupply, useBurnedBalance } from '../../../hooks/useTokenBalance'
import { getNovaAddress } from '../../../utils/addressHelpers'
import useNovaEarnings from '../../../hooks/useNovaEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import StatsCard from './StatsCard'
import Stats from './Stats'
import HarvestButton from './HarvestButton'
import QuestionHelper from '../../../components/QuestionHelper'

const Block = styled.div`
  margin-bottom: 0px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 8px;
`

const CardImage = styled.img`
  margin-bottom: 0px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label1 = styled.div`
  color: #ffffff;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsNovaWithBalance = useNovaFarmsWithBalance()
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))
  const novaPrice = usePriceNovaBusd().toNumber()
  const novaEarnings = useNovaEarnings()
  const earningsNovaSum = novaEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  const balancesNovaWithValue = farmsNovaWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const { onNovaReward } = useNovaHarvest(balancesNovaWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const harvestNovaFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onNovaReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onNovaReward])

  // Stats
  const farms = useFarms()
  const totalSupply = useTotalSupply()

  const burnedBalance = useNovaBurnSupply()
  const burnedNova = burnedBalance ? getBalanceNumber(burnedBalance) : 0

  const supply = totalSupply ? totalSupply.minus(-burnedBalance) : new BigNumber(0)
  const novaSupply = getBalanceNumber(supply)

  const fakeburn = useBurnedBalance(getNovaAddress())
  const theSupply = totalSupply ? totalSupply.minus(fakeburn) : new BigNumber(0)
  const circNova = getBalanceNumber(theSupply)

  const marketCap = usePriceNovaBusd().times(theSupply)

  const NovaPerBlock = farms[0]?.NovaPerBlock ? getBalanceNumber(new BigNumber(farms[0].NovaPerBlock)) : 0

  const stats = [
    { label: TranslateString(999, 'Market Cap').toUpperCase(), value: getBalanceNumber(marketCap), prefix: '$' },
    { label: TranslateString(536, 'Total Minted'), value: novaSupply },
    { label: TranslateString(538, 'Total Burned'), value: burnedNova },
    { label: TranslateString(999, 'Circulating Supply').toUpperCase(), value: circNova },
    { label: 'NOVA/BLOCK', value: NovaPerBlock },
  ]

  return (
    <StatsCard title="NOVA Stats">
      <Row style={{ justifyContent: 'center', padding: '5px 0 10px 0' }}>
        <CardImage src="/images/tokens/nova.png" alt="nova logo" width={128} height={128} />
      </Row>
      <Block>
        <Label>Pending NOVA</Label>
        <Label1>
          <NovaHarvestBalance earningsSum={earningsNovaSum} />
          &nbsp; ~ ${(novaPrice * earningsNovaSum).toFixed(2)}
        </Label1>
      </Block>
      <Block>
        <Label>
          NOVA Balance
          <QuestionHelper
            text={TranslateString(
              999,
              'NOVA is the utility token for ShibaNova. It can be obtained as yield rewards for liquidity farms and can also be obtained by swapping sNOVA for it.',
            )}
          />
        </Label>
        <Label1>
          <NovaWalletBalance novaBalance={novaBalance} />
          &nbsp; ~ ${(novaPrice * novaBalance).toFixed(2)}
        </Label1>
      </Block>
      <Actions>
        {account ? (
          <HarvestButton
            id="harvest-nova"
            disabled={balancesNovaWithValue.length <= 0 || pendingTx}
            onClick={harvestNovaFarms}
            fullWidth
          >
            {pendingTx
              ? TranslateString(999, 'Collecting NOVA')
              : TranslateString(999, `Harvest all NOVA (${balancesNovaWithValue.length})`)}
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Actions>
      <Stats stats={stats} />
    </StatsCard>
  )
}

export default FarmedStakingCard
