import React from 'react'
import styled from 'styled-components'
import {
  useEnterBattle,
  useGetAttackPower,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetFleetSize,
  useGetMaxMineralCapacity,
  useGetPlayer,
  useGetPlayerBattle,
  useGetShipClasses,
  useGetShips,
  useGetBattle,
} from 'hooks/useNovaria'
import { BATTLE_COOLDOWN, TIME_MODIFIER } from 'config'
import ModalActions from '../../../components/NovariaModalActions'
import NovariaModal from '../../../components/NovariaModal'

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

const Child = styled.div`
  margin-bottom: 5px;
`

interface PlayerModalProps {
  refinery: boolean
  shipyard: boolean
  account: string
  player: string
  currentLocation: boolean
  onDismiss?: () => void
}

const PlayerModal: React.FC<PlayerModalProps> = ({ account, refinery, shipyard, player, currentLocation, onDismiss }) => {
  const ships = useGetShips(player)
  const shipClasses = useGetShipClasses()
  const playerInfo = useGetPlayer(player)
  const exp = playerInfo.experience
  const playerName = playerInfo.name
  const playerBattleStatus = playerInfo.battleStatus.toString()
  const fleetLocation = useGetFleetLocation(player)
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const fleetMineral = useGetFleetMineral(player)
  const fleetMaxMineral = useGetMaxMineralCapacity(player)

  const bscscan = 'https://bscscan.com/address/'
  const accountAddress = account !== null ? account : ''
  const isPlayer = player.toString() === accountAddress.toString()

  const playerBattleInfo = useGetPlayerBattle(account)
  const battleID = Number(playerBattleInfo.battleId)
  const inBattle = Number(playerBattleInfo.battleStatus) !== 0
  console.log('inbattle', inBattle)
  const resolvedTime = Number(useGetBattle(battleID).resolvedTime) + (BATTLE_COOLDOWN / TIME_MODIFIER)
  const battleCooldownActive = new Date(Number(resolvedTime) * 1000) > new Date()

  const targetplayerBattleInfo = useGetPlayerBattle(player)
  const targetbattleID = Number(targetplayerBattleInfo.battleId)
  const targetresolvedTime = Number(useGetBattle(targetbattleID).resolvedTime) + (BATTLE_COOLDOWN / TIME_MODIFIER)
  const targetbattleCooldownActive = new Date(Number(targetresolvedTime) * 1000) > new Date()

  const { onEnterBattle } = useEnterBattle()

  const handleEnterBattle = (target, mission) => {
    if (mission === 'attack') {
      if (playerBattleStatus === '1') {
        onEnterBattle(target, 2)
      } else {
        onEnterBattle(target, 1)
      }
    } else if (mission === 'defend') {
      if (playerBattleStatus === '2') {
        onEnterBattle(target, 2)
      } else if (playerBattleStatus === '1') {
        onEnterBattle(target, 1)
      }
    }
  }

  return (
    <NovariaModal title={playerName} onDismiss={onDismiss}>
      <div>
        <Child>
          ADDRESS:
          <span style={{ fontSize: 10 }}>
            <a href={bscscan + player} target="blank" rel="noreferrer noopener">
              {' '}
              {player}
            </a>
          </span>
        </Child>
        <Child>EXP: {exp}</Child>
        <Child>
          SHIPS:{' '}
          {shipClasses.map((ship, index) => {
            return (
              <span key={ship.name}>
                {ships[index]} {ship.name}s,{' '}
              </span>
            )
          })}
        </Child>
        <Child>
          LOCATION: ({fleetLocation.X}, {fleetLocation.Y})
        </Child>
        <Child>SIZE: {fleetSize}</Child>
        <Child>ATTACK: {fleetPower}</Child>
        <Child>MINERAL: {(Number(fleetMineral) / 10 ** 18).toFixed(3)}</Child>
        <Child>MAX MINERAL: {(Number(fleetMaxMineral) / 10 ** 18).toFixed(2)}</Child>
        <Child>
          BATTLE STATUS: {playerBattleStatus === '0' && 'Not in Battle'}
          {playerBattleStatus === '1' && 'Attacking'}
          {playerBattleStatus === '2' && 'Defending'}
        </Child>
      </div>
      {!inBattle && !isPlayer && currentLocation && !(refinery && shipyard) && !battleCooldownActive && (
        <ModalActions>
          {!targetbattleCooldownActive && (
            <Button onClick={() => handleEnterBattle(player, 'attack')}>ATTACK</Button>
          )}
          {playerBattleStatus !== '0' && <Button onClick={() => handleEnterBattle(player, 'defend')}>DEFEND</Button>}
        </ModalActions>
      )}
    </NovariaModal>
  )
}

export default PlayerModal
