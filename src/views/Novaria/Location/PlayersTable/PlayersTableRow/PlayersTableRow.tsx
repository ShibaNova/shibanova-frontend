import { useModal } from '@pancakeswap-libs/uikit'
import { useGetAttackPower, useGetFleetSize, useGetNameByAddress, useGetFleetMineral } from 'hooks/useNovaria'
import React from 'react'
import styled from 'styled-components'
import PlayerModal from '../PlayerModal'

const Row = styled.div<{ status: number }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border: 1px solid #289794;
  padding: 3px;
  margin: 4px 0;
  &:hover {
    background-color: #289794;
  }
`
const Cell = styled.div`
  text-overflow: ellipsis;
  text-align: right;
`

const PlayersTableRow = ({ account, refinery, shipyard, player, currentLocation }) => {
  const fleetSize = useGetFleetSize(player)
  const fleetPower = useGetAttackPower(player)
  const name = useGetNameByAddress(player)
  const mineral = Number(useGetFleetMineral(player))
  const [handleClick] = useModal(
    <PlayerModal
      account={account}
      refinery={refinery}
      shipyard={shipyard}
      player={player}
      currentLocation={currentLocation}
    />,
  )

  return (
    <Row status={player.battleStatus} onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0}>
      <Cell style={{ textAlign: 'left' }}>{name}</Cell>
      <Cell>{fleetSize}</Cell>
      <Cell>{fleetPower}</Cell>
      <Cell>{(mineral / 10 ** 18).toFixed(2)}</Cell>
    </Row>
  )
}

export default PlayersTableRow
