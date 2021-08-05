import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, Tag } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'
import Divider from './Divider'

const StyledTag = styled(Tag)`
  position: absolute;
  top: -32px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  right: 30px;
`

const Container = styled.div`
  position: relative;
  padding: 18px;
  border-right: solid 2px ${({ theme }) => theme.colors.primary};
  border-top: solid 1px ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  border-top-left-radius: 0;
  text-align: right;
  font-size: 28px;
  min-width: 310px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 18px 40px 28px;
    font-size: 32px;
  }
`

const StyledDivider = styled(Divider)`
  position: absolute;
  width: 100%;
  top: -1px;
  right: 26px;
  height: 1px;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue()
  // const tvl = totalValue.toFixed(2);

  return (
    <Container>
      {/* @ts-ignore: Unreachable code error */}
      <StyledTag glowing bold>
        TOTAL DEPOSITED
      </StyledTag>
      <StyledDivider />
      <CardValue fontSize="inherit" value={totalValue.toNumber()} prefix="$" decimals={2} />
    </Container>
  )
}

export default TotalValueLockedCard
