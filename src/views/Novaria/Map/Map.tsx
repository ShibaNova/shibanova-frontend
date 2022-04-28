import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ConnectedAccountContext } from 'App'
import { useGetFleetLocation, useGetFleetMineral, useGetMaxMineralCapacity, useGetPlayer, useGetPlayerExists } from 'hooks/useNovaria'
import styled from 'styled-components'
import { useMap } from 'hooks/useContract'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import UpdateBanner from '../components/Banner'
import ChatButton from '../components/ChatBox/ChatButton'
import scrapLogo from '../assets/scrap.png'
import emptyLogo from '../assets/emptyLocation.png'
import youLogo from '../assets/you.png'
import lowPlayers from '../assets/lowplayers.png'
import medPlayers from '../assets/medplayers.png'
import highPlayers from '../assets/highplayers.png'
import asteroid from '../assets/asteroid.png'
import star1 from '../assets/star1.png'
import unexploredIcon from '../assets/unexplored.svg'
import upArrow from '../assets/upArrow.png'
import downArrow from '../assets/downArrow.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import BodyWrapper from '../components/BodyWrapper'
import wormholeLogo from '../assets/wormhole.png'
import miningPlanet from '../assets/miningPlanet.png'
import shipyardPlanet from '../assets/shipyardPlanet.png'
import refineryPlanet from '../assets/refineryPlanet.png'
import dualPlanet from '../assets/dualPlanet.png'
import Legend from './Legend'

const fetchMapData = async (contract, lx: number, ly: number) => {
  const data = await contract.methods.getCoordinatePlaces(lx, ly).call()
  console.log(data)
  return data
}

const arrayToMatrix = (arr, size) => {
  const res = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

export interface GridProps {
  nx: number
  ny: number
}

export interface TextProps {
  isStar: boolean
}

const Page = styled.div`
  background-size: cover;
  font-size: 15px;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const Body = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
`

const Text = styled.div`
  color: ${(props: TextProps) => (props.isStar ? '#ff7300' : '#5affff')};
  font-size: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-gap: 1px;
  margin: 10px 10px 10px;
  padding: 10px;
`

const GridCell = styled.div<{hasBattle: boolean, canTravel: boolean}>`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  direction: ltr;

  border: ${(props) => props.hasBattle && '1px solid red'};
  background: ${(props) => props.canTravel && '#ffffff05'};
  

  @media (mmin-width: 800px) {
    width: 100px;
    height: 80px;
  }
`

const GridCellImg = styled.img`
  //position: relative;
  align-items: center;
  align-self: center;
  max-height: 70%;
`

const IndicatorImg = styled.img`
  align-self: center;
`

const GridIcon = styled.img`
  width: 20px;
  height: 20px;
`

const GridCellContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 20px;
  flex-wrap: no-wrap;
  position: relative;
  aspect-ratio: 17/8;
  padding: 5px 5px;

  width: 100px;
  height: 80px;
  @media (max-width: 420px) {
    width: 45px;
    height: 100px;
  }
  @media (min-width: 900px) {
    width: 110px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 150px;
  }
`

const Row = styled.div`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const MainRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: nowrap;
  }
`

const GridCellId = styled.div<{canTravel: boolean}>`
  position: absolute;
  bottom: 0px;
  right: 2px;
  font-size: 0.5rem;
  opacity: 0;

  color: ${(props) => props.canTravel && 'red'};

  ${GridCell} :hover & {
    opacity: 1;
  }
`

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 10px;
`

const Button = styled.button`
  cursor: pointer;
  min-height: 35px;
  align-self: center;
  padding: 0.25rem 1.25rem;
  font-family: sans-serif;
  font-size: 1rem;
  text-decoration: none;
  color: #5affff;
  border: 1px solid #5affff;
  border-radius: 0px;
  background-color: transparent;
`

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
  border: 1px solid #5affff;
  -moz-appearance: textfield;
  color: white;
`

const InputControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  color: white;
  gap: 5px;
  margin: 10px;
`



const MoveControls = styled.div`
  display: flex;
`

const MoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const NX = 7
const NY = 7

const Map: React.FC = () => {
  const account = useContext(ConnectedAccountContext)

  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const player = useGetPlayer(account)
  const playerExists = useGetPlayerExists(account)

  const mapContract = useMap()

  const [X, _setX] = useState(() => Number(localStorage.getItem('locationX')) || 0)
  const setX = (value: number) => {
    localStorage.setItem('locationX', String(value))
    _setX(value)
  }

  const [Y, _setY] = useState(() => Number(localStorage.getItem('locationY')) || 0)
  const setY = (value: number) => {
    localStorage.setItem('locationY', String(value))
    _setY(value)
  }

  const [mapData, setMapData] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const adjustedX = Math.max(0, X - Math.floor(NX / 2))
      const adjustedY = Math.max(0, Y - Math.floor(NY / 2))
      const data = await fetchMapData(mapContract, adjustedX, adjustedY)
      setMapData({ x0: adjustedX, y0: adjustedY, data: arrayToMatrix(data, NX) })
    }
    fetch()
  }, [mapContract, X, Y])

  const [formX, setFormX] = useState(X)
  const [formY, setFormY] = useState(Y)

  // Find location button
  const handleFindLocationClick = () => {
    if (X === formX && Y === formY) {
      return
    }
    setX(formX)
    setY(formY)
  }

  // My Location button
  const handleFleetLocation = async (newX, newY) => {
    if (X === newX && Y === newY) {
      return
    }
    setX(newX)
    setY(newY)
    setFormX(newX)
    setFormY(newY)
  }

  // Map Arrows
  const handleMapArrow = async (moveX, moveY) => {
    let calcX = X
    let calcY = Y
    if (X < 3) {
      calcX = 3
    }
    if (Y < 3) {
      calcY = 3
    }
    const newX = Math.max(Math.min(Math.floor(NX / 2), Number(calcX)), Number(calcX) + moveX)
    const newY = Math.max(Math.min(Math.floor(NY / 2), Number(calcY)), Number(calcY) + moveY)

    if (X === newX && Y === newY) {
      return
    }

    setX(newX)
    setY(newY)
    setFormX(newX)
    setFormY(newY)
  }

  const travelDistance = (x:number, y:number) => {
    return Math.floor(((fleetLocation.X-x)**2 + (fleetLocation.Y-y)**2)**(1/2))
    
  } 

  if (!mapData) {
    return null
  }

  return (
    <Page>
      <UpdateBanner />
      <GameHeader
        location={fleetLocation}
        playerMineral={fleetMineral}
        playerMineralCapacity={mineralCapacity}
        exp={player.experience}
        playerName={player.name}
      />
      <MainRow>
        <GameMenu pageName="starmap" />
        <Body>
          <BodyWrapper>
            {/* <ChatButton playerExists={playerExists} playerName={player.name} /> */}
            <Grid nx={mapData.data[0].length} ny={mapData.data.length}>
              {mapData.data.map((arr, y) => {
                const ry = Number(mapData.data.length - y - 1)
                return mapData.data[y].map((planet, x) => {
                  return (
                    <GridCell hasBattle={planet.activeBattleCount > 0} 
                      canTravel={travelDistance(Number(x) + Number(mapData.x0), Number(ry) + Number(mapData.y0)) <= 5} >
                      <Link
                        to={{
                          pathname: '/location',
                          state: [{ x: Number(x) + Number(mapData.x0), y: Number(ry) + Number(mapData.y0) }],
                        }}
                      >
                        <GridCellContent aria-haspopup="true">
                          <Text isStar={planet.placeType === '3'}>{planet.name}</Text>

                          <Row>
                            {planet.salvage > 0 && <GridIcon src={scrapLogo} alt="has salvage" />}
                            {(Number(ry) + Number(mapData.y0)).toString() === fleetLocation.Y.toString() &&
                              (Number(x) + Number(mapData.x0)).toString() === fleetLocation.X.toString() && (
                                <IndicatorImg src={youLogo} alt="current location" />
                              )}

                            {planet.fleetCount > 0 && planet.fleetCount < 11 && (
                              <GridIcon src={lowPlayers} alt="planet has few players" />
                            )}

                            {planet.fleetCount > 10 && planet.fleetCount < 51 && (
                              <GridIcon src={medPlayers} alt="planet has many players" />
                            )}

                            {planet.fleetCount > 50 && (
                              <GridIcon src={highPlayers} alt="planet has more than 50 players" />
                            )}

                            {planet.placeType === '0' && (
                              <GridCellImg
                                style={{ width: '50px', height: 'auto' }}
                                src={unexploredIcon}
                                alt="unexplored"
                              />
                            )}
                            {planet.placeType === '5' && planet.availableMineral > 0 && <GridCellImg src={asteroid} alt="asteroid" />}
                            {planet.placeType === '5' && planet.availableMineral <= 0 &&  <GridCellImg src={emptyLogo} alt="asteroid" />}
                            {planet.placeType === '6' && <GridCellImg src={wormholeLogo} alt="wormhole" />}

                            {planet.placeType === '4' && !planet.hasRefinery === true && !planet.hasShipyard && <GridCellImg src={miningPlanet} alt="mining planet" />}
                            {planet.placeType === '4' && !planet.hasRefinery === true && planet.hasShipyard && <GridCellImg src={shipyardPlanet} alt="shipyard planet" />}
                            {planet.placeType === '4' && planet.hasRefinery === true && planet.hasShipyard === true && <GridCellImg src={dualPlanet} alt="dual planet" />}
                            {planet.placeType === '4' && planet.hasRefinery === true && !planet.hasShipyard && <GridCellImg src={refineryPlanet} alt="refinery planet" />}

                            {planet.placeType === '3' && <GridCellImg src={star1} alt="star" />}
                            {planet.placeType === '1' && planet.canTravel && (
                              <GridCellImg src={emptyLogo} alt="empty" />
                            )}
                          </Row>
                          <GridCellId canTravel={travelDistance(Number(x) + Number(mapData.x0), Number(ry) + Number(mapData.y0)) > 5}>
                            {travelDistance(Number(x) + Number(mapData.x0), Number(ry) + Number(mapData.y0))} AU <br />
                            ( {Number(x) + Number(mapData.x0)} ,{Number(ry) + Number(mapData.y0)} )
                          </GridCellId>
                        </GridCellContent>
                      </Link>
                    </GridCell>
                  )
                })
              })}
            </Grid>
          </BodyWrapper>
          <GridControls>
            <MoveControls>
              <MoveButton type="button" onClick={() => handleMapArrow(-2, 0)}>
                <img src={leftArrow} alt="left" />
              </MoveButton>
              <MoveButton type="button" onClick={() => handleMapArrow(0, -2)}>
                <img src={downArrow} alt="down" />
              </MoveButton>
              <MoveButton type="button" onClick={() => handleMapArrow(0, 2)}>
                <img src={upArrow} alt="up" />
              </MoveButton>
              <MoveButton type="button" onClick={() => handleMapArrow(2, 0)}>
                <img src={rightArrow} alt="right" />
              </MoveButton>
            </MoveControls>
            <Button type="button" onClick={() => handleFleetLocation(fleetLocation.X, fleetLocation.Y)}>
              My Location
            </Button>
            <InputControl>
              <Button type="button" onClick={handleFindLocationClick}>
                Find location (x, y)
              </Button>
              (
              <CoordInput type="number" min="0" value={formX} onChange={(e) => setFormX(parseFloat(e.target.value))} />
              ,
              <CoordInput type="number" min="0" value={formY} onChange={(e) => setFormY(parseFloat(e.target.value))} />)
            </InputControl>
          </GridControls>
          <Legend />
        </Body>
      </MainRow>
    </Page>
  )
}

export default Map
