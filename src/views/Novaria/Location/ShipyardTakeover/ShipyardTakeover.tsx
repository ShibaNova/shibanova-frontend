import React from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import showCountdown from 'utils/countdownTimer'
import TakeOverModal from './TakeOverModal'

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  width: 100%;
  margin-top: 10px;
  padding: 0.6em;
  &:hover {
    background-color: #5affff;
    color: black;
  }
`

const Disabled = styled.button`
  color: gray;
  border: 1px solid gray;
  width: 100%;
  background: transparent;
`

const ShpiyardTakeover = ({ shipyard, placeX, placeY, refinery, account, currentLocation, timeMod }) => {
  const cooldownTime = new Date((Number(shipyard.lastTakeoverTime) + (60 * 60 * 24 * 28) / timeMod) * 1000)
  const inCooldownStage = Number(cooldownTime) > Number(new Date())
  const underDeadline = Number(new Date(shipyard.takeoverDeadline * 1000)) > Number(new Date())
  const underAttack = Number(shipyard.status) !== 0
  const takeoverTimer = showCountdown(new Date(shipyard.takeoverDeadline * 1000))
  const [handleClick] = useModal(
    <TakeOverModal
      underDeadline={underDeadline}
      account={account}
      shipyard={shipyard}
      placeX={placeX}
      placeY={placeY}
      underAttack={underAttack}
      currentLocation={currentLocation}
    />,
  )

  return (
    <div>
      {inCooldownStage && !refinery && <Disabled>Takeover Cooldown {showCountdown(cooldownTime)}</Disabled>}
      {!inCooldownStage && !underAttack && !refinery && (
        <Button type="button" onClick={handleClick}>
          TAKEOVER POSSIBLE
        </Button>
      )}
      {underAttack && !refinery && (
        <Button type="button" onClick={handleClick}>
          <span style={{ color: 'red', fontSize: 15 }}>
            TAKEOVER IN PROGRESS <br />
            {takeoverTimer}
          </span>
        </Button>
      )}
      {refinery && 'Shipyard cannot be taken over'}
    </div>
  )
}

export default ShpiyardTakeover
