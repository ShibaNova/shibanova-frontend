import React from 'react'
import styled from 'styled-components'
import shipyardLogo from '../../assets/shipyard.png'
import scrapLogo from '../../assets/scrap.png'
import refineryLogo from '../../assets/refinery.png'
import youLogo from '../../assets/you.png'
import mineralLogo from '../../assets/mineral.png'
import lowPlayers from '../../assets/lowplayers.png'
import medPlayers from '../../assets/medplayers.png'
import highPlayers from '../../assets/highplayers.png'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: 1px solid gray;
  margin: 5px 10px;
  padding: 5px;
  align-items: center;
  & > * {
    margin: 5px;
  }
`

const GridIcon = styled.img`
  width: 20px;
  height: 20px;
`

const Legend: React.FC = () => (
  <Wrapper>
    <span>
      <GridIcon src={mineralLogo} alt="planet has mineral" /> : Mineral
    </span>
    <span>
      <GridIcon src={shipyardLogo} alt="planet has shipyard" /> : Shipyard
    </span>
    <span>
      <GridIcon src={refineryLogo} alt="planet has refinery" /> : Refinery (DMZ)
    </span>
    <span>
      <GridIcon src={scrapLogo} alt="has salvage" /> : Salvage
    </span>
    <span>
      <GridIcon src={youLogo} alt="your location" /> : Current Location
    </span>
    <span>
      <GridIcon src={lowPlayers} alt="planet has few players" /> : 1-10 players
    </span>
    <span>
      <GridIcon src={medPlayers} alt="planet many players" /> : 11-50 players
    </span>
    <span>
      <GridIcon src={highPlayers} alt="planet 50 plus players" /> : 51+ players
    </span>
  </Wrapper>
)

export default Legend
