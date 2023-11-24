import React from 'react'
import { Card, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import CardValue from './CardValue'

const StyledStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  box-shadow: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 10px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 15px;
  }
`

interface Stat {
  label: string
  value: string | number
  decimals?: number
  prefix?: string
  suffix?: string
}

const Stats = ({ stats }: { stats: Stat[] }) => (
  <StyledStats>
    {stats.map(({ label, value, decimals = 2, prefix = null, suffix = null }) => (
      <Row>
        <Text bold fontSize="12px">
          {label}
        </Text>
        {typeof value === 'string' ? (
          <Text glowing bold fontSize="14px">
            {prefix}
            {value}
          </Text>
        ) : (
          <CardValue fontSize="14px" prefix={prefix} suffix={suffix} value={value} decimals={decimals} />
        )}
      </Row>
    ))}
  </StyledStats>
)

export default Stats
