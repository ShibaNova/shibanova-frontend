import React, { useState } from 'react'
import styled from 'styled-components'
import {
  useTravel,
  useRefine,
  useCollect,
  useExplore,
  useGetTravelCooldown,
  useGetFleetTravelCost,
  useMine,
  useGetExploreCost,
  useTunnel,
  useGetNovaBalance,
  useGetNameByAddress,
} from 'hooks/useNovaria'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const Body = styled.div`
  position: relative;
  margin: 15px;
  width: 300px;
  height: 450px;
`

const HavenImageCard = styled.div`
  background-image: url('/images/novaria/haven.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const ShipyardImageCard = styled.div`
  background-image: url('/images/novaria/shipyardCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const RefineryImageCard = styled.div`
  background-image: url('/images/novaria/refineryCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const ShipyardRefineryImageCard = styled.div`
  background-image: url('/images/novaria/shipyardRefineryCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const MiningImageCard = styled.div`
  background-image: url('/images/novaria/miningCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const EmptyImageCard = styled.div`
  background-image: url('/images/novaria/empty.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const HostileImageCard = styled.div`
  background-image: url('/images/novaria/hostileCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const AsteroidImageCard = styled.div`
  background-image: url('/images/novaria/asteroidCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const StarImageCard = styled.div`
  background-image: url('/images/novaria/starCard2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const UnexploredImageCard = styled.div`
  background-image: url('/images/novaria/unexplored.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const WormholeImageCard = styled.div`
  background-image: url('/images/novaria/wormholeCard.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const PlaceHeader = styled.div`
  position: absolute;
  top: 230px;
  left: 14px;
  width: 255px;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
`

const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
`

const Location = styled.div`
  font-weight: bold;
  text-align: right;
`

const Text = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: #289794;
`

const PlaceBody = styled.div`
  position: absolute;
  top: 295px;
  left: 10px;
  width: 260px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  width: 110px;
  margin: 5px;
  &:hover {
    background-color: #5affff;
    color: black;
  }
  &:disabled {
    color: gray;
    border-color: gray;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
    }
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LocationCard = ({
  placename,
  placetype,
  discoverer,
  mineral,
  salvage,
  shipyard,
  refinery,
  placeX,
  placeY,
  fleetLocation,
  isMining,
  canTravel,
  currentLocation,
  fleetSize,
  playerMineral,
  playerMaxMineral,
  Luminosity,
  atWormhole,
  miningCooldownActive,
  currentTravelCooldown,
  notInBattle,
  miningCapacity,
}) => {
  const [pending, setPendingTx] = useState(false)

  const { account } = useWallet()
  const travelCost = useGetFleetTravelCost(account, placeX, placeY) / 10 ** 18
  const travelCooldown = useGetTravelCooldown(account, placeX, placeY) / 60
  const exploreCost = useGetExploreCost(placeX, placeY, account)
  const distance = Math.floor(
    Math.sqrt(Math.abs(placeX - fleetLocation.X) ** 2 + Math.abs(placeY - fleetLocation.Y) ** 2),
  )
  const atMaxMineral = Number(playerMaxMineral) <= Number(playerMineral)
  const discovererName = useGetNameByAddress(discoverer)

  const unexplored = placetype === '0'
  const isEmpty = placetype === '1'
  const hostile = placetype === '2'
  const star = placetype === '3'
  const planet = placetype === '4'
  const asteroid = placetype === '5'
  const wormhole = placetype === '6'
  const haven = placename === 'Haven'

  const travelOnCooldown = currentTravelCooldown > new Date()
  const canTunnel = wormhole && atWormhole && !currentLocation && !travelOnCooldown && notInBattle && !pending
  const novaBalance = useGetNovaBalance(account)

  const miningIsDisabled = !currentLocation || atMaxMineral || miningCooldownActive || pending || miningCapacity <= 0
  const travelIsDisabled =
    travelOnCooldown ||
    distance > 5 ||
    fleetSize < 25 ||
    novaBalance < travelCost ||
    !notInBattle ||
    miningCooldownActive ||
    pending
  const refiningDisabled = !currentLocation || Number(playerMineral) <= 0 || pending

  const { onExplore } = useExplore()
  const { onMine } = useMine()
  const { onRefine } = useRefine()
  const { onCollect } = useCollect()
  const { onTravel } = useTravel()
  const { onTunnel } = useTunnel()

  const sendTunnelTx = async () => {
    setPendingTx(true)
    try {
      await onTunnel(placeX, placeY)
      console.log('Tunneling To:', placeX, placeY)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendTravelTx = async () => {
    setPendingTx(true)
    try {
      await onTravel(placeX, placeY)
      console.log('Traveling To:', placeX, placeY)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendCollectTx = async () => {
    setPendingTx(true)
    try {
      await onCollect()
      console.log('Collecting Salvage')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendRefineTx = async () => {
    setPendingTx(true)
    try {
      await onRefine()
      console.log('Refining')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendMineTx = async () => {
    setPendingTx(true)
    try {
      await onMine()
      console.log('Mining Mineral')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }
  const sendExploreTx = async () => {
    setPendingTx(true)
    try {
      await onExplore(placeX, placeY)
      console.log('Exploring')
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Body>
      {haven ? <HavenImageCard /> : ''}
      {isEmpty ? <EmptyImageCard /> : ''}
      {shipyard && !refinery && !haven ? <ShipyardImageCard /> : ''}
      {refinery && !shipyard && !haven ? <RefineryImageCard /> : ''}
      {refinery && shipyard && !haven ? <ShipyardRefineryImageCard /> : ''}
      {asteroid ? <AsteroidImageCard /> : ''}
      {star ? <StarImageCard /> : ''}
      {hostile ? <HostileImageCard /> : ''}
      {unexplored ? <UnexploredImageCard /> : ''}
      {isMining === true ? <MiningImageCard /> : ''}
      {wormhole && <WormholeImageCard />}
      <PlaceHeader>
        <Row>
          <Name>
            {placename}
            {isEmpty ? 'EMPTY SPACE' : ''}
            {hostile ? 'HOSTILE SPACE' : ''}
            {asteroid && 'ASTEROID'}
          </Name>
          <Location>
            ({placeX},{placeY})
          </Location>
        </Row>
        <Row style={{ fontSize: 12, marginTop: 3 }}>
          <span>{shipyard === true ? 'SHIPYARD' : ''}</span>
          <span>{refinery === true ? 'REFINERY' : ''}</span>
          <span>
            {Number(salvage) > 0 ? (salvage / 10 ** 18).toFixed(3) : ''} {Number(salvage) > 0 ? 'SALVAGE' : ''}
          </span>
          <span>
            {Number(mineral) > 0 ? (mineral / 10 ** 18).toFixed(3) : ''} {Number(mineral) > 0 ? 'MINERAL' : ''}
          </span>
          <span>{unexplored ? 'UNEXPLORED' : ''}</span>
          <span>{star ? <span>STAR Luminosity {Luminosity}</span> : ''}</span>
          <span>{wormhole && 'WORMHOLE'}</span>
          <span>Discoverer: {discovererName}</span>
        </Row>
      </PlaceHeader>
      <PlaceBody>
        {placename === 'Haven' && <Text>The last planet of Humanity. Your journey starts here.</Text>}
        {placename === 'Cetrus 22A' && <Text>Planet with huge chunks of Nova Mineral. A powerful resource.</Text>}
        {placename === 'Cetrus 22B' && (
          <Text>Draken technology was found here, and helped us build the legendary ship, &quot;Novaria.&quot;</Text>
        )}

        {Number(salvage) > 0 && (
          <Button onClick={sendCollectTx} disabled={miningIsDisabled}>
            {pending ? 'pending...' : 'COLLECT'}
          </Button>
        )}
        {hostile && 'Fleets cannot travel to hostile space'}
        {Number(mineral) > 0 && (
          <Button onClick={sendMineTx} disabled={miningIsDisabled}>
            {pending ? 'pending...' : 'MINE'}
          </Button>
        )}
        {refinery && (
          <Button onClick={sendRefineTx} disabled={refiningDisabled}>
            {pending ? 'pending...' : 'REFINE'}
          </Button>
        )}
        {canTravel && !currentLocation && (
          <Button onClick={sendTravelTx} disabled={travelIsDisabled}>
            {pending ? 'pending...' : 'TRAVEL'}
          </Button>
        )}
        {unexplored && distance < 4 && <Button onClick={sendExploreTx}>{pending ? 'pending...' : 'EXPLORE'}</Button>}
        {canTunnel && <Button onClick={sendTunnelTx}>{pending ? 'pending...' : 'TUNNEL'}</Button>}

        <Row style={{ marginTop: 5, color: '#289794', fontSize: 11 }}>
          {distance > 5 && !currentLocation && !hostile && <span>Too far to travel</span>}
          {unexplored && !currentLocation && !hostile && <span>Location must be explored</span>}
          {unexplored && distance > 3 && <span>Can only explore within 3 AU</span>}
          {fleetSize < 25 && !currentLocation && !hostile && (
            <span>Your fleet is too small (under 25 fleet size) to travel </span>
          )}
          {travelOnCooldown && !currentLocation && !hostile && <span>Your jump drive is on cooldown</span>}
          {!notInBattle && !currentLocation && !hostile && <span>Cannot travel while in battle</span>}
          {novaBalance < travelCost && !currentLocation && !hostile && <span>Not enough NOVA to travel</span>}
          {atMaxMineral && !hostile && (isMining || salvage > 0) && <span>You are at max mineral capacity</span>}
          {isMining && Number(mineral) === 0 && <span>Waiting for mines to refill</span>}
          {miningCooldownActive && (isMining || salvage > 0) && currentLocation && (
            <span>Mining/collecting on cooldown</span>
          )}
          {distance < 6 && !unexplored && !hostile && !star && !currentLocation && (
            <div>
              <span>Travel Cost (NOVA): {!currentLocation ? travelCost.toFixed(2) : ''}</span>
              <br />
              <span>Travel Cooldown: {!currentLocation ? <span>{travelCooldown.toFixed(2)} min.</span> : ''}</span>
            </div>
          )}
          {!currentLocation && <span>Distance: {Math.floor(distance)} AU(s)</span>}
          {currentLocation && <span>YOU ARE HERE.</span>}
          {unexplored && <span>Explore Cost (NOVA): {(exploreCost / 10 ** 18).toFixed(2)}</span>}
          <br />
          {wormhole &&
            'Wormholes allow players to tunnel (travel) from one wormhole to any other wormhole at 1/10th the cost.'}
          {canTunnel && <span>Tunnel Cost (NOVA): {travelCost / 10}</span>}
          {shipyard && !haven && (
            <span>
              Shipyards can be taken over once every 7 days, dependent upon last takeover/discovery time. A successful
              takeover allows the owner to set the shipyard name and set/collect the build fee.
            </span>
          )}
        </Row>
      </PlaceBody>
    </Body>
  )
}
export default LocationCard
