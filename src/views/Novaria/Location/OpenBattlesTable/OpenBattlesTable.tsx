import React from 'react'
import styled from 'styled-components'
import OpenBattlesTableRow from './OpenBattlesTableRow'

const Body = styled.div`
  margin: 10px 5px;
  display: relative;
`

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  color: #289794;
  font-size: 12px;
`

const TableContent = styled.div`
  overflow-y: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  max-height: 140px;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

const OpenBattlesTable = ({ battles, status, currentLocation }) => {
  return (
    <Body>
      <div>
        <HeaderRow>
          <div>BATTLE ID</div>
          <div>ATK ATTACK</div>
          <div>DEF ATTACK</div>
          <div>RESOLVE TIME</div>
        </HeaderRow>
      </div>
      <TableContent>
        {battles.map((battle) => (
          <OpenBattlesTableRow key={battle} battle={battle} status={status} currentLocation={currentLocation}  />
        ))}
      </TableContent>
    </Body>
  )
}

export default OpenBattlesTable
