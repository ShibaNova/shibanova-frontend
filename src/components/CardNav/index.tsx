import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@becoswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const [index, setIndex] = useState(activeIndex)
  const TranslateString = useI18n()
  const history = useHistory()

  const handleClick = (newIndex) => {
    setIndex(newIndex)
    history.push(newIndex !== 0 ? '/pool' : '/swap')
  }

  return (
    <StyledNav>
      <ButtonMenu onClick={handleClick} activeIndex={index} size="sm" variant="primary">
        <ButtonMenuItem id="swap-nav-link">{TranslateString(1142, 'Swap')}</ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link">{TranslateString(262, 'Liquidity')}</ButtonMenuItem>
        <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://www.binance.org/en/bridge"
          target="_blank"
          rel="noreferrer noopener"
        >
          Bridge
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
