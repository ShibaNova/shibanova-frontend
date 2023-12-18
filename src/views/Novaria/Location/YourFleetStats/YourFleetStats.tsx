import React, { useState } from 'react'
import styled from 'styled-components'
import {
  useGetBattle,
  useRecall,
  useSetRecall,
  useGetSavedSpawnPlace,
  useBoostTravel,
  useGetCostMod,
} from 'hooks/useNovaria'
import showCountdown from 'utils/countdownTimer'
import { getWeb3 } from 'utils/web3'

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  width: 100%;
  margin: 5px;
  &:hover {
    background-color: #5affff;
    color: black;
  }
`

const YourFleetStats = ({
  account,
  playerBattleInfo,
  fleetSize,
  maxFleetSize,
  fleetPower,
  miningCapacity,
  mineralCapacity,
  shipClasses,
  playerFleet,
  currentTravelCooldown,
  currentMiningCooldown,
  fleetLocation,
}) => {
  const web3 = getWeb3()

  const [pending, setPendingTx] = useState(false)

  const costMod = useGetCostMod()
  const battleID = Number(playerBattleInfo.battleId)
  const resolvedTime = Number(useGetBattle(battleID).resolvedTime) + 900
  const battleCooldown = showCountdown(new Date(Number(resolvedTime) * 1000))
  const miningCooldown = showCountdown(currentMiningCooldown)
  const travelCooldown = showCountdown(currentTravelCooldown)
  const savedShipyard = useGetSavedSpawnPlace(account)
  const atSavedShipyard =
    Number(fleetLocation.X) === Number(savedShipyard.x) && Number(fleetLocation.Y) === Number(savedShipyard.y)
  const Haven = Number(fleetLocation.X) === Number(0) && Number(fleetLocation.Y) === Number(0)
  const smallFleet = Number(fleetSize) < Number(25)
  const canRecall = smallFleet && !Haven
  const canRecallShipyard = smallFleet && !atSavedShipyard
  const travelOnCooldown = currentTravelCooldown > new Date()

  const { onBoostTravel } = useBoostTravel()
  const handleBoostTravel = async () => {
    setPendingTx(true)
    try {
      await onBoostTravel()
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const { onRecall } = useRecall()
  const sendRecallTx = async (haven: boolean) => {
    setPendingTx(true)
    try {
      await onRecall(haven)
      console.log('Recalling')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const { onSetRecall } = useSetRecall()
  const sendSetRecall = async () => {
    setPendingTx(true)
    try {
      await onSetRecall()
      console.log('Setting Recall Point')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Stats>
      <Stat>
        <div>SIZE</div>
        <div>
          {fleetSize}/{maxFleetSize}
        </div>
      </Stat>
      <Stat>
        <div>ATTACK</div>
        <div>{fleetPower}</div>
      </Stat>
      <Stat>
        <div>MINING</div>
        <div>
          {Number(web3.utils.fromWei(miningCapacity)).toFixed(2)}/
          {Number(web3.utils.fromWei(mineralCapacity)).toFixed(1)}
        </div>
      </Stat>

      {shipClasses.map((ship, i) => {
        return (
          <Stat key={ship.name}>
            <div>{ship.name.toUpperCase()}S</div>
            <div>{playerFleet[i] || '-'}</div>
          </Stat>
        )
      })}

      <div style={{ fontWeight: 'bold' }}>COOLDOWNS</div>

      <Stat>
        <div>MINING</div>
        <div>{miningCooldown}</div>
      </Stat>
      <Stat>
        <div>TRAVEL</div>
        <div>{travelCooldown}</div>
      </Stat>
      {travelOnCooldown ? (
        <Button style={{ margin: '0px' }} onClick={() => handleBoostTravel()}>
          {!pending ? `50% Boost - ${((fleetSize * 0.02) / costMod).toFixed(2)} PHX` : 'pending...'}
        </Button>
      ) : (
        ''
      )}
      <Stat>
        <div>BATTLE</div>
        <div>{battleCooldown}</div>
      </Stat>
      {!atSavedShipyard && (
        <Button style={{ margin: '0px' }} onClick={sendSetRecall}>
          {!pending ? 'SET SHIPYARD RECALL POINT' : 'pending'}
        </Button>
      )}
      {canRecall && <Button onClick={() => sendRecallTx(true)}>{!pending ? 'RECALL TO HAVEN' : 'pending'}</Button>}
      {canRecallShipyard && (
        <Button onClick={() => sendRecallTx(false)}>
          {!pending ? `RECALL TO SHIPYARD (${savedShipyard.x},${savedShipyard.y})` : 'pending'}
        </Button>
      )}
    </Stats>
  )
}

export default YourFleetStats
