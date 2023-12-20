import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  useGetAttackPower,
  useGetBattlesAtLocation,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetFleetsAtLocation,
  useGetFleetSize,
  useGetPlaceInfo,
  useGetPlayerBattle,
  useGetPlayerBattleStatus,
  useGetCurrentTravelCooldown,
  useGetPlayer,
  useGetCurrentMiningCooldown,
  useGetShipyards,
  useGetMaxFleetSize,
  useGetMaxMineralCapacity,
  useGetMiningCapacity,
  useGetShipClasses,
  useGetShips,
  useGetPlayerInBattle,
  useGetPlayerExists,
  useGetFleetMineralRefined,
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import { Text } from '@pancakeswap-libs/uikit'
import { io } from 'socket.io-client'
import { TIME_MODIFIER } from 'config'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import LocationCard from './LocationCard'
import OpenBattlesTable from './OpenBattlesTable'
import PlayersTable from './PlayersTable'
import YourFleetStats from './YourFleetStats'
import BattleStatus from './BattleStatus'
import PlaceControls from './PlaceControls'
import ShipyardTakeover from './ShipyardTakeover'
import BodyWrapper from '../components/BodyWrapper'
import upArrow from '../assets/upArrow.png'
import downArrow from '../assets/downArrow.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
import homeIcon from '../assets/homeicon.png'
import UpdateBanner from '../components/Banner'

const socket = io('https://radiant-taiga-26464.herokuapp.com/', {
  autoConnect: false,
})

const Page = styled.div`
  font-size: 15px;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: nowrap;
  }
`

const Row = styled.div`
  flex-wrap: wrap;
  display: flex;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: nowrap;
  }
`

const Header = styled(Text)`
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 5px 0 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
`

const Content = styled.div`
  // display: grid;
  // grid-template-columns: 2fr 3fr 2fr;
  // position: inherit;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
`

const OpenBattlesCard = styled.div<{ refinery: boolean; shipyard: boolean }>`
  background-image: url('/images/novaria/locationTableBorder.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 20px 10px;
  padding: 10px;
  max-height: 45%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
  display: ${(props) => props.refinery && props.shipyard && 'none'}; 
  
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
`

const PlayersCard = styled.div<{ refinery: boolean }>`
  background-image: url('/images/novaria/locationTableBorder.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 20px 10px;
  padding: 10px;
  max-height: ${(props) => (props.refinery ? '100%' : '45%')};
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
`

const RightCol = styled.div`
  flex: 1;
`

const FleetMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-left: none;
  @media (min-width: 1170px) {
    flex-wrap: wrap;
    border-left: 1px solid gray;
  }
  height: 100%;
  padding: 10px;
  // @media (max-width: 420px) {
  //   margin-left: 35px;
  // }
`

const LeftCol = styled.div`
  margin-left: auto;
  margin-right: auto;
`
const CenterCol = styled.div``

const CoordInput = styled.input`
  width: 4em;
  background: transparent;
  -moz-appearance: textfield;
  color: white;
  border: 1px solid #5affff;
  border-radius: 5px;
`

const InputControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 0px 8px 0px 8px;
  gap: 5px;
  border-bottom: 1px solid #5affff;
`

const YourFleetCard = styled.div``
const TakeOverMenu = styled.div`
  margin: 10px;
  margin-left: 0px;
`
const BattleProgressCard = styled.div`
  margin-top: 10px;
`

const MoveControls = styled.div`
  display: flex;
`

const MoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const Location: React.FC = () => {
  const account = useContext(ConnectedAccountContext)

  const shipClasses = useGetShipClasses()
  const playerFleet = useGetShips(account)

  const fleetLocation = useGetFleetLocation(account)
  const location = useLocation()
  const loadedCoords =
    typeof location.state === 'undefined' ? { x: fleetLocation.X, y: fleetLocation.Y } : location.state[0]

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      console.log(`socket connected: ${socket.connected}`)
    })
  }, [])

  const [placeX, setX] = useState(null)
  const [placeY, setY] = useState(null)

  useEffect(() => {
    if (typeof location.state === 'undefined') {
      setX(fleetLocation.X)
      setY(fleetLocation.Y)
    } else {
      setX(loadedCoords.x)
      setY(loadedCoords.y)
    }
  }, [location.state, fleetLocation.X, fleetLocation.Y, loadedCoords.x, loadedCoords.y])

  const handleHome = () => {
    setX(fleetLocation.X)
    setY(fleetLocation.Y)
  }

  // Main place info functions
  const placeInfo = useGetPlaceInfo(placeX, placeY)
  const battlesAtLocation = useGetBattlesAtLocation(placeX, placeY, 0, 0)
  const fleetsAtLocation = useGetFleetsAtLocation(placeX, placeY)

  const fleetSize = useGetFleetSize(account)
  const refinedMineral = (useGetFleetMineralRefined(account) / 10 ** 18).toFixed(2)
  const totalRefined = Number(refinedMineral).toFixed(0)
  const maxFleetSize = useGetMaxFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const miningCapacity = useGetMiningCapacity(account)
  const currentTravelCooldown = new Date(useGetCurrentTravelCooldown(account) * 1000)
  const currentMiningCooldown = new Date(useGetCurrentMiningCooldown(account) * 1000)
  const playerBattleStatus = useGetPlayerBattleStatus(account)
  const playerBattleInfo = useGetPlayerBattle(account)
  const player = useGetPlayer(account.toString())
  const playerEXP = player.experience
  const playerExists = useGetPlayerExists(account)
  const playerName = player.name
  const shipyards = useGetShipyards()
  const isDiscoverer = placeInfo.discoverer === account
  const atWormhole = useGetPlaceInfo(fleetLocation.X, fleetLocation.Y).type === '6'

  const currentLocation = Number(fleetLocation.X) === Number(placeX) && Number(fleetLocation.Y) === Number(placeY)
  const openbattles = false
  const timeMod = TIME_MODIFIER

  const playerInBattle = useGetPlayerInBattle(account)

  useEffect(() => {
    const userData = {
      name: playerName,
      size: fleetSize,
      attack: fleetPower,
      experience: playerEXP,
      totalMineral: totalRefined,
      location: `(${fleetLocation.X},${fleetLocation.Y})`,
    }
    if (playerName !== '') {
      socket.emit('send_rankings', userData)
      console.log(`sent user data: ${userData}`)
    }
  }, [playerName, playerEXP, fleetPower, fleetSize, totalRefined, fleetLocation.X, fleetLocation.Y])

  return (
    <Page>
      <GameHeader
        location={fleetLocation}
        playerMineral={fleetMineral}
        playerMineralCapacity={mineralCapacity}
        exp={playerEXP}
        playerName={playerName}
      />
      <Row>
        <GameMenu pageName="location" />
        <BodyWrapper>
          <Content>
            <LeftCol>
              {placeX !== null && (
                <LocationCard
                  playerMineral={fleetMineral}
                  playerMaxMineral={mineralCapacity}
                  miningCapacity={miningCapacity}
                  discoverer={placeInfo.discoverer}
                  fleetSize={fleetSize}
                  placename={placeInfo.name}
                  placetype={placeInfo.type}
                  placeX={placeX}
                  placeY={placeY}
                  mineral={placeInfo.mineral}
                  salvage={placeInfo.scrap}
                  shipyard={placeInfo.shipyard}
                  refinery={placeInfo.refinery}
                  isMining={placeInfo.isMining}
                  fleetLocation={fleetLocation}
                  canTravel={placeInfo.canTravel}
                  currentTravelCooldown={currentTravelCooldown}
                  currentLocation={currentLocation}
                  Luminosity={placeInfo.luminosity}
                  atWormhole={atWormhole}
                  miningCooldownActive={currentMiningCooldown > new Date()}
                  notInBattle={playerBattleInfo.battleStatus.toString() === '0' && playerInBattle === false}
                />
              )}
            </LeftCol>
            <CenterCol>
              <InputControl>
                SEARCH LOCATION:
                <CoordInput type="number" min="0" value={placeX} onChange={(e) => setX(parseFloat(e.target.value))} />
                ,
                <CoordInput type="number" min="0" value={placeY} onChange={(e) => setY(parseFloat(e.target.value))} />
                <MoveControls>
                  <MoveButton onClick={() => setX(Number(placeX) - 1 < 0 ? 0 : Number(placeX) - 1)}>
                    <img src={leftArrow} alt="left" />
                  </MoveButton>
                  <MoveButton onClick={() => setY(Number(placeY) - 1 < 0 ? 0 : Number(placeY) - 1)}>
                    <img src={downArrow} alt="down" />
                  </MoveButton>
                  <MoveButton onClick={() => setY(Number(placeY) + 1)}>
                    <img src={upArrow} alt="up" />
                  </MoveButton>
                  <MoveButton onClick={() => setX(Number(placeX) + 1)}>
                    <img src={rightArrow} alt="right" />
                  </MoveButton>
                  <MoveButton onClick={handleHome}>
                    <img src={homeIcon} alt="right" />
                  </MoveButton>
                </MoveControls>
              </InputControl>

              <OpenBattlesCard refinery={placeInfo.refinery} shipyard={placeInfo.shipyard}>
                <Header>OPEN BATTLES</Header>
                <OpenBattlesTable
                  battles={battlesAtLocation}
                  status={playerBattleStatus}
                  currentLocation={currentLocation}
                  resolved={openbattles}
                  account={account}
                />
              </OpenBattlesCard>
              <PlayersCard refinery={placeInfo.refinery}>
                <Header>PLAYERS</Header>
                <PlayersTable
                  account={account}
                  players={fleetsAtLocation}
                  currentLocation={currentLocation}
                  refinery={placeInfo.refinery}
                  shipyard={placeInfo.shipyard}
                />
              </PlayersCard>
            </CenterCol>
            <RightCol>
              <FleetMenu>
                <YourFleetCard>
                  <Header>MY FLEET</Header>
                  <YourFleetStats
                    account={account}
                    playerBattleInfo={playerBattleInfo}
                    fleetSize={fleetSize}
                    maxFleetSize={maxFleetSize}
                    fleetPower={fleetPower}
                    miningCapacity={miningCapacity}
                    mineralCapacity={mineralCapacity}
                    shipClasses={shipClasses}
                    playerFleet={playerFleet}
                    currentTravelCooldown={currentTravelCooldown}
                    currentMiningCooldown={currentMiningCooldown}
                    fleetLocation={fleetLocation}
                  />
                </YourFleetCard>
                <BattleProgressCard>
                  <Header>BATTLE PROGRESS</Header>
                  {playerExists && (
                    <BattleStatus
                      playerBattleInfo={playerBattleInfo}
                      playerBattleStatus={playerBattleInfo.battleStatus}
                      currentLocation={fleetLocation}
                    />
                  )}
                </BattleProgressCard>
                {shipyards
                  .filter((shipyard) => shipyard.coordX === placeX.toString() && shipyard.coordY === placeY.toString())
                  .map((shipyard) => (
                    <TakeOverMenu>
                      <Header>Shipyard Takeover</Header>
                      <Header style={{ color: '#5affff', fontSize: 14 }}>{shipyard.name}</Header>
                      <ShipyardTakeover
                        account={account}
                        shipyard={shipyard}
                        placeX={placeX}
                        placeY={placeY}
                        refinery={placeInfo.refinery}
                        currentLocation={currentLocation}
                        timeMod={timeMod}
                      />
                    </TakeOverMenu>
                  ))}
                <PlaceControls
                  placeType={Number(placeInfo.type)}
                  placeX={placeX}
                  placeY={placeY}
                  placeName={placeInfo.name}
                  isDiscoverer={isDiscoverer}
                />
              </FleetMenu>
            </RightCol>
          </Content>
        </BodyWrapper>
      </Row>
    </Page>
  )
}

export default Location
