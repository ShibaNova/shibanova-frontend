import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, CardHeader, CardFooter } from '@pancakeswap-libs/uikit'

const StyledCard = styled(Card)`
  text-align: center;
`

const StyledCardHeader = styled(CardHeader)`
  @media (min-width: 360px) and (max-width: 576px) {
    padding: 12px;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
  @media (min-width: 360px) and (max-width: 576px) {
    font-size: 28px;
  }
`

const StyledCardBody = styled(CardBody)`
  @media (min-width: 360px) and (max-width: 576px) {
    padding: 10px;
  }
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
  return (
    // @ts-ignore: Unreachable code error
    <StyledCard gradientBorder>
      <StyledCardHeader>
        {/* @ts-ignore: Unreachable code error */}
        <StyledHeading glowing>{title}</StyledHeading>
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
