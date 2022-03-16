import React from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import { useGetBattle } from 'hooks/useNovaria'
import showCountdown from 'utils/countdownTimer'
import BattleModal from '../OpenBattlesTable/BattleModal'

const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:10px;
`

const NoBattle = styled.div`
    border: 1px solid #5affff;
    padding: 5px;
    text-align: center;
`

const BattleButton = styled.button`
    cursor: pointer;
    border: 1px solid #5affff;
    margin-top: 5px;
    background: transparent;
    color: #5affff;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 5px;
    justify-content: center;
    &:hover {
      background: #5affff;
      color: black;
    }
`

const BattleStatus = ({ playerBattleStatus, playerBattleInfo, currentLocation }) => {
   

    const attacking = playerBattleInfo.battleStatus === '1'
    const defending = playerBattleInfo.battleStatus === '2'
    const battleId = Number(playerBattleInfo.battleId)
    const startTime = showCountdown(new Date(useGetBattle(battleId).deadline * 1000))

    const isSameLocation = Number(currentLocation.X) === Number(playerBattleInfo.coordX) && Number(currentLocation.Y) === Number(playerBattleInfo.coordY)
    
    const [handleClick] = useModal(<BattleModal battle={battleId} status={playerBattleStatus} currentLocation={isSameLocation} />) 

  return (
    <Body>
      {playerBattleInfo.battleStatus === '0' ? <NoBattle>Not in Battle</NoBattle> : ''}
      {defending ? <NoBattle> DEFENDING </NoBattle> : '' }
      {attacking ? <NoBattle> ATTACKING </NoBattle>: '' }
      {playerBattleStatus !== '0' ?  <BattleButton type='button' onClick={handleClick}>BATTLE {battleId} <br /> {startTime}</BattleButton>: ''}
        
    </Body>
  )
}

export default BattleStatus
