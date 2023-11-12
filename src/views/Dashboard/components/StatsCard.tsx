import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, CardHeader, CardFooter } from '@pancakeswap-libs/uikit'
import QuestionHelper from '../../../components/QuestionHelper'

const StyledCard = styled(Card)`
  text-align: center;
  flex: 1;
  margin: 2px 2.5px;
`

const StyledCardHeader = styled(CardHeader)`
  padding: 12px;
`

const StyledHeading = styled(Heading)`
  font-size: 1.5rem;
`

const StyledCardBody = styled(CardBody)`
  padding: 0px 10px;
`

const StyledCardFooter = styled(CardFooter)`
  padding-top: 0;
  border-top: none;
`

const StatsCard = ({
  title,
  children,
  actions,
}: {
  title: string
  children: JSX.Element | JSX.Element[]
  actions?: JSX.Element
}) => {
  const moneyPotInfo =
    title === 'Money Pot'
      ? 'The pot is distributed out to all sNOVA holders. Your reward/snova is delivered every block. The pot is updated daily with the fees from the previous day.'
      : ''
  const snovaInfo =
    title === 'sNOVA Stats'
      ? 'sNOVA is the share token for ShibaNova. Holders get rewarded with dividends from the Money Pot. sNOVA can only be obtained through NOVA-BNB and NOVA-BUSD farms.'
      : ''
  const novaInfo =
    title === 'NOVA Stats'
      ? 'NOVA is the utility token for ShibaNova. It can be obtained as yield rewards for liquidity farms and can also be obtained by swapping sNOVA for it.'
      : ''
  const phxInfo =
    title === 'PHX Stats' ? 'PHX is a synthetic token representing the value/token of the Phoenix trading account.' : ''
  const infoArray = [novaInfo, snovaInfo, moneyPotInfo, phxInfo]
  const infoMap = infoArray
    .map((item) => item)
    .join('')
    .toString()

  return (
    <StyledCard gradientBorder>
      <StyledCardHeader style={{ padding: '10px 0 0 0' }}>
        <StyledHeading glowing style={{ padding: '0 0 0 0' }}>
          {title}
          <QuestionHelper text={infoMap} />
        </StyledHeading>
      </StyledCardHeader>
      <StyledCardBody>{children}</StyledCardBody>
      {actions && <StyledCardFooter>{actions}</StyledCardFooter>}
    </StyledCard>
  )
}

StatsCard.defaultProps = {
  actions: null,
}

export default StatsCard
