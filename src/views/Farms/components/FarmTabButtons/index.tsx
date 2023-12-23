import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Text, Toggle, Checkbox, darkColors } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const SearchFarm = styled.div`
  margin-left: 14px;
  color: white;
  font-weight: bold;

  > input {
    background: transparent;
    border: 1px solid #5affff;
    border-radius: 4px;
    height: 34px;
    padding: 4px;
    font-size: 16px;
    color: #5affff;
    width: 120px;
  }
`

const FarmTabButtons = ({ stakedOnly, setStakedOnly, setShowInactive, setFilterValue, filterValue }) => {
  const [index, setIndex] = useState(0)
  const TranslateString = useI18n()

  const handleClick = (newIndex) => {
    setIndex(newIndex)
    setShowInactive(newIndex !== 0)
  }

  return (
    <Wrapper>
      <ToggleWrapper>
        <CheckWrap>
          <Checkbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
        </CheckWrap>
        <Text bold>Staked</Text>
      </ToggleWrapper>
      {/* <ToggleWrapper>
        <Toggle checked={extremeOnly} onChange={() => setExtremeOnly(!extremeOnly)} />
        <Text bold>Extreme</Text>
      </ToggleWrapper> */}
      <ButtonMenu onClick={handleClick} activeIndex={index} size="sm" variant="primary">
        <ButtonMenuItem>{TranslateString(698, 'Active')}</ButtonMenuItem>
        <ButtonMenuItem>{TranslateString(700, 'Inactive')}</ButtonMenuItem>
      </ButtonMenu>
      <SearchFarm>
        Search: <input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
      </SearchFarm>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  height: 30px;

  ${Text} {
    margin-left: 8px;
  }
`

const CheckWrap = styled.div`
  border: 1px solid ${darkColors.backgroundDisabled};
  border-radius: 10px;
`
