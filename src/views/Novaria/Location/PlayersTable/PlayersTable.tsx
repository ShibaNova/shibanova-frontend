import React from 'react'
import styled from 'styled-components'
import PlayersTableRow from './PlayersTableRow'

const Body = styled.div`
  margin: 10px 5px;
  display: relative;
`

const HeaderRow = styled.div<{ isRefinery: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  color: #289794;
  font-size: 12px;
  text-align: right;
  margin-top: ${(props) => props.isRefinery && '20px'};
`

const TableContent = styled.div<{ isRefinery: boolean }>`
  overflow-y: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  max-height: ${(props) => (props.isRefinery ? '280px' : '140px')};

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

const PlayersTable = ({ account, refinery, shipyard, players, currentLocation }) => {
  return (
    <Body>
      <div>
        <HeaderRow isRefinery={refinery}>
          <div style={{ textAlign: 'left' }}>PLAYER</div>
          <div>SIZE</div>
          <div>ATTACK</div>
          <div style={{ marginRight: 6 }}>MINERAL</div>
        </HeaderRow>
      </div>
      <TableContent isRefinery={refinery}>
        {players.map((player) => (
          <PlayersTableRow
            key={player}
            refinery={refinery}
            shipyard={shipyard}
            account={account}
            player={player}
            currentLocation={currentLocation}
          />
        ))}
      </TableContent>
    </Body>
  )
}

export default PlayersTable
