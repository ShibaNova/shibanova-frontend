import React, { useState } from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import useTokenBalance, {
  useMoneyPotBNBReward,
  useMoneyPotBUSDReward,
  useDistributedMoneyPotBNB,
  useDistributedMoneyPotBUSD,
  useNextMoneyPot,
  useSNovaTotalSupply,
} from 'hooks/useTokenBalance'
import { usePriceBnbBusd, usePriceNovaBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { useHarvestRewards } from 'hooks/useHarvest'
import { getSNovaAddress } from 'utils/addressHelpers'

import StatsCard from './StatsCard'
import Stats from './Stats'
import UnlockButton from '../../../components/UnlockButton'
import HarvestButton from './HarvestButton'
import CardValue from './CardValue'

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 0px 0;
`

const GridRow = styled.div`
  align-items: center;
  display: flex;
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
  // margin-bottom: 0px;
  // margin-top: 0px;
  // margin: auto;
  align-items: center;
  text-align: center;
`

const NextMoneyPotCard = styled(Text)`
  position: relative;
  font-size: 12px;
  padding: 10px;
  border-radius: 5px;
  background-clip: padding-box;
  // border: solid 1px ${({ theme }) => theme.colors.primary};

  & > a {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const MoneyPotCard = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const bnbReward = useMoneyPotBNBReward()
  const bnbUserRew = Number(bnbReward) / 10 ** 18
  const busdReward = useMoneyPotBUSDReward()
  const busdUserRew = Number(busdReward) / 10 ** 18
  const distributedMoneyPotWBNB = useDistributedMoneyPotBNB()
  const distributedMoneyPotBUSD = useDistributedMoneyPotBUSD()
  const sNovaSupply = useSNovaTotalSupply()
  const sNovaBalance = useTokenBalance(getSNovaAddress())
  const nextMoneyPot = useNextMoneyPot()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestRewards()
  const bnbPrice = usePriceBnbBusd()
  const moneypotBNBValue = (Number(bnbPrice) * distributedMoneyPotWBNB[0]) / 10 ** 18
  const moneypotBUSDValue = distributedMoneyPotBUSD[0] / 10 ** 18
  const moneypotValue = moneypotBUSDValue + moneypotBNBValue
  const sNovaShare = (moneypotValue / Number(sNovaSupply)) * 10 ** 18
  const totalvalue = (distributedMoneyPotWBNB[0] * Number(bnbPrice)) / 10 ** 18 + distributedMoneyPotBUSD[0] / 10 ** 18
  const rewardTotal = Number(bnbPrice) * bnbUserRew + busdUserRew
  const share = (Number(sNovaBalance) / Number(sNovaSupply)) * 100
  const novaPrice = usePriceNovaBusd().toNumber()
  const dailyROI = (sNovaShare / novaPrice) * 100
  const yearlyROI = dailyROI * 365

  const sendTx = async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const stats = [
    { label: 'USD/sNOVA', value: sNovaShare || 0, prefix: '$' },
    { label: 'YOUR SHARE', value: share || 0, suffix: '%' },
    { label: 'LAST REWARD BLOCK', value: distributedMoneyPotBUSD[2] },
  ]

  return (
    <StatsCard title="Money Pot">
      <GridRow>
        <CardImage src="/images/home/moneyPot.png" alt="snova logo" width={80} height={80} />

        <Col>
          <Row>
            <CardValue fontSize="34px" value={totalvalue || 0} prefix="$" decimals={2} />
          </Row>
          <Text glowing bold style={{ padding: '0px 0px 3px 0' }}>
            <span style={{ color: '#5affff' }}>Daily ROI</span> {dailyROI.toFixed(2)}%
          </Text>
          <Text glowing bold style={{ padding: '0 0px 3px 0' }}>
            <span style={{ color: '#5affff' }}>Annual ROI</span> {yearlyROI.toFixed(2)}%
          </Text>
        </Col>
      </GridRow>
      <Row style={{ paddingTop: '0px' }}>
        {account ? (
          <HarvestButton
            disabled={bnbReward?.toNumber() === 0 || busdReward?.toNumber() === 0 || pendingTx}
            onClick={sendTx}
          >
            {TranslateString(999, 'Harvest Rewards - $')}
            {rewardTotal.toFixed(2)}
          </HarvestButton>
        ) : (
          <UnlockButton fullWidth />
        )}
      </Row>

      <Row style={{ justifyContent: 'center' }}>
        <div style={{ padding: '5px 20px', display: 'flex' }}>
          <CardImage src="/images/farms/bnb.png" alt="bnb logo" width={60} height={60} />
          <div style={{ marginLeft: 5 }}>
            <Text bold fontSize="20px">
              {TranslateString(999, 'WBNB ')}
            </Text>
            <CardValue fontSize="18px" value={bnbUserRew || 0} decimals={4} />
          </div>
        </div>
        <div style={{ padding: '0 20px', display: 'flex' }}>
          <CardImage src="/images/farms/busd.png" alt="busd logo" width={60} height={60} />
          <div style={{ marginLeft: 5 }}>
            <Text bold fontSize="20px">
              {TranslateString(999, ' BUSD ')}
            </Text>
            <CardValue fontSize="18px" value={busdUserRew || 0} decimals={4} />
          </div>
        </div>
      </Row>
      <div>
        <Stats stats={stats} />
        <Row style={{ marginTop: -10, justifyContent: 'center', padding: '0px 0 3px 0' }}>
          <NextMoneyPotCard>
            Next Moneypot starts rewarding at block{' '}
            <a target="_blank" rel="noreferrer" href={`https://bscscan.com/block/${nextMoneyPot?.toNumber()}`}>
              #{nextMoneyPot?.toNumber()}
            </a>
          </NextMoneyPotCard>
        </Row>
      </div>
    </StatsCard>
  )
}

export default MoneyPotCard
