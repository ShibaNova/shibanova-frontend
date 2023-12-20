import React from 'react'
import styled from 'styled-components'
import { useEnterBattle, useGetBattle, useGoBattle } from 'hooks/useNovaria'
import { BATTLE_COOLDOWN, TIME_MODIFIER } from 'config'
import ModalActions from '../../../components/NovariaModalActions'
import Modal from '../../../components/NovariaModal'
import PlayerList from './PlayerList'

interface BattleModalProps {
  battle: number
  status: string
  currentLocation: boolean
  onDismiss?: () => void
}

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
  font-weight: medium;
  font-size: 16px;
  padding: 5px 10px;
  &:hover {
    background: #5affff;
    color: black;
  }
`

const BattleModal: React.FC<BattleModalProps> = ({ battle, status, currentLocation, onDismiss }) => {
  const battleInfo = useGetBattle(battle)
  const atkPower = battleInfo.attackTeam[1]
  const defPower = battleInfo.defendTeam[1]
  const { attackers, defenders } = battleInfo
  const defender = defenders[0]
  const startTime = new Date(battleInfo.deadline * 1000).toLocaleString()
  const battleReady = new Date() >= new Date(battleInfo.deadline * 1000)
  const inBattle = status
  const resolved = Number(battleInfo.resolvedTime) > 0

  const resolvedTime = Number(battleInfo.resolvedTime) + (BATTLE_COOLDOWN / TIME_MODIFIER)
  const battleCooldownActive = new Date(Number(resolvedTime) * 1000) > new Date()

  const { onBattle } = useGoBattle()

  const sendBattleTx = async () => {
    try {
      await onBattle(battle)
      console.log('Completing Battle')
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const { onEnterBattle } = useEnterBattle()
  let battleTitle = 'BATTLE '
  battleTitle += battle.toString()
  return (
    <Modal title={battleTitle} onDismiss={onDismiss}>
      <div>Attackers Attack Power: {atkPower}</div>
      <div>Defenders Attack Power: {defPower}</div>
      <div>
        Attackers({attackers.length}):{' '}
        {attackers.map((player) => (
          <PlayerList player={player} />
        ))}
      </div>
      <div>
        Defenders({defenders.length}):{' '}
        {defenders.map((player) => (
          <PlayerList player={player} />
        ))}
      </div>
      <div>Deadline: {startTime}</div>
      {!resolved && (
        <ModalActions>
          {!inBattle && currentLocation && !battleCooldownActive && (
            <div>
              <Button onClick={() => onEnterBattle(defender, 1)}>JOIN ATTACKERS</Button>
              <Button onClick={() => onEnterBattle(defender, 2)}>JOIN DEFENDERS</Button>
            </div>
          )}
          {battleReady ? <Button onClick={sendBattleTx}>RESOLVE</Button> : ''}
        </ModalActions>
      )}
    </Modal>
  )
}

export default BattleModal
