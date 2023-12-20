import { TIME_MODIFIER } from 'config'
import { useGetPlaceInfo } from 'hooks/useNovaria'
import React from 'react'
import styled from 'styled-components'

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: initial;
`

const StatsCol = styled.div`
  display: flex;
  flex-direction: column;
`

const StatsItem = styled.div`
  margin: 5px 0px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const ShipyardList = ({ shipyard }) => {
  const timeMod = TIME_MODIFIER
  const cooldownTime = new Date((Number(shipyard.lastTakeoverTime) + 604800 / timeMod) * 1000)
  const inCooldownStage = Number(cooldownTime) > Number(new Date())
  const underAttack = Number(shipyard.status) !== 0
  const placeInfo = useGetPlaceInfo(Number(shipyard.coordX), Number(shipyard.coordY))
  const isRefinery = placeInfo.refinery

  return (
    <StatsRow>
      <StatsCol>
        <StatsItem>{shipyard.name}</StatsItem>
      </StatsCol>
      <StatsCol>
        <StatsItem style={{ textAlign: 'right' }}>
          ({shipyard.coordX}, {shipyard.coordY})
        </StatsItem>
      </StatsCol>
      <StatsCol>
        <StatsItem style={{ textAlign: 'right' }}>
          {underAttack && 'In Progress'}
          {!underAttack && inCooldownStage && !isRefinery && '-'}
          {!underAttack && isRefinery && 'Safe Zone'}
          {!underAttack && !inCooldownStage && !isRefinery && 'Available'}
        </StatsItem>
      </StatsCol>
    </StatsRow>
  )
}
export default ShipyardList
