import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text, Skeleton, Card } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { useFarmFromPid, useFarmUser } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

// background: linear-gradient(45deg,
//  rgba(255, 0, 0, 1) 0%,
//  rgba(255, 154, 0, 1) 10%,
//  rgba(208, 222, 33, 1) 20%,
//  rgba(79, 220, 74, 1) 30%,
// rgba(63, 218, 216, 1) 40%,
// rgba(47, 201, 226, 1) 50%,
// rgba(28, 127, 238, 1) 60%,
// rgba(95, 21, 242, 1) 70%,
// rgba(186, 12, 248, 1) 80%,
// rgba(251, 7, 217, 1) 90%,
// rgba(255, 0, 0, 1) 100%);
// background-size: 300% 300%;

const StyledCardAccent = styled.div`
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
  border-style: solid;
  border-color: white;
`
// background: ${(props) => props.theme.card.background}
const FCard = styled(Card)`
  align-self: baseline;
  border-radius: 30px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 16px;
  position: relative;
  text-align: center;
  grid-column: 3;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }
`

const Divider = styled.div`
  background-color: #00aaff;
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  novaPrice?: BigNumber
  bnbPrice?: BigNumber
  busdPrice?: BigNumber
  usdtPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({
  farm,
  removed,
  novaPrice,
  busdPrice,
  bnbPrice,
  usdtPrice,
  ethPrice,
  ethereum,
  account,
}) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { pid, lpAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. NOVA-BNB LP, LINK-BNB LP,
  // NAR-NOVA LP. The images should be nova-bnb.svg, link-bnb.svg, nar-nova.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
      return busdPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.USDT) {
      return usdtPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.NOVA) {
      return novaPrice.times(farm.isTokenOnly ? farm.tokenAmount : farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, busdPrice, novaPrice, usdtPrice, ethPrice, farm])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

 



  const lpLabel = farm.lpSymbol
  let earnLabel = ''

  
  if (farm.pid === 1 || farm.pid === 2) {
    earnLabel = 'sNOVA'
  } else {
    earnLabel = 'NOVA'
  }
  const farmAPY =
    farm.apy &&
    farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm

  return (
    <FCard gradientBorder>
      {farm.tokenSymbol === 'NOVA' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        // depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text bold glowing fontSize="14px">
            {TranslateString(352, 'APR')}:
          </Text>
          <Text glowing bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                <ApyButton
                  lpLabel={lpLabel}
                  quoteTokenAdresses={quoteTokenAdresses}
                  quoteTokenSymbol={quoteTokenSymbol}
                  tokenAddresses={tokenAddresses}
                  novaPrice={novaPrice}
                  apy={farm.apy}
                  earnLabel={earnLabel}
                />
                {farmAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text bold fontSize="12px">
          {TranslateString(318, 'EARN')}:
        </Text>
        <Text>{earnLabel}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text bold glowing style={{ fontSize: '14px' }}>
          {TranslateString(999, 'Total Value Locked')}:
        </Text>
        <Text bold glowing style={{ fontSize: '18px' }}>
          {totalValueFormated}
        </Text>
      </Flex>
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly
              ? `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}#balances`
              : `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          depositFee={farm.depositFeeBP / 100}
          // totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
        <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
