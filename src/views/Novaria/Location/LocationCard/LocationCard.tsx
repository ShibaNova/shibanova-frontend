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
  useGetTimeModifier,
  useGetExploreCost,
  useShipyardTakeover,
  useGetShipyards,
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
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const ShipyardImageCard = styled.div`
  background-image: url('/images/novaria/shipyardCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const RefineryImageCard = styled.div`
  background-image: url('/images/novaria/refineryCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const ShipyardRefineryImageCard = styled.div`
  background-image: url('/images/novaria/shipyardRefineryCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const MiningImageCard = styled.div`
  background-image: url('/images/novaria/miningCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const EmptyImageCard = styled.div`
  background-image: url('/images/novaria/empty.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const HostileImageCard = styled.div`
  background-image: url('/images/novaria/hostileCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const AsteroidImageCard = styled.div`
  background-image: url('/images/novaria/asteroidCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const StarImageCard = styled.div`
  background-image: url('/images/novaria/starCard-min.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const UnexploredImageCard = styled.div`
  background-image: url('/images/novaria/unexplored.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
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

const PlaceBody = styled.div`
  position: absolute;
  top: 330px;
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
  fleetSize
}) => {
  const [pending, setPendingTx] = useState(false)

  const { account } = useWallet()
  const travelCost = useGetFleetTravelCost(account, placeX, placeY) / 10 ** 18
  const timeMod = useGetTimeModifier()
  const travelCooldown = useGetTravelCooldown(account, placeX, placeY) / 60 / timeMod
  const exploreCost = useGetExploreCost(placeX, placeY)
  const distance = Math.sqrt(Math.abs(placeX - fleetLocation.X)**2 + Math.abs(placeY - fleetLocation.Y)**2) 
 

  const unexplored = placetype === '0'
  const isEmpty = placetype === '1' 
  const hostile = placetype === '2'
  const star = placetype === '3'
  const planet = placetype === '4'
  const asteroid = placetype === '5'
  const wormhole = placetype === '6'
  const haven = placename === 'Haven'

  
  
  const { onTakeover } = useShipyardTakeover()
  const { onExplore } = useExplore()
  const { onMine } = useMine()
  const { onRefine } = useRefine()
  const { onCollect } = useCollect()
  const { onTravel } = useTravel()
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
  const sendTakeoverTx = async () => {
    setPendingTx(true)
    try {
      await onTakeover(placeX, placeY)
      console.log('attempting shipyard takeover')
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
      <PlaceHeader>
        <Row>
          <Name>
            {placename}
            {isEmpty ? 'EMPTY SPACE' : ''}
            {hostile ? 'HOSTILE SPACE' : ''}
          </Name>
          <Location>
            ({placeX},{placeY})
          </Location>
        </Row>
        <Row style={{ fontSize: 12, marginTop: 3 }}>
          <span>{shipyard === true ? 'SHIPYARD' : ''}</span>
          <span>{refinery === true ? 'REFINERY' : ''}</span>
          <span>
            {salvage > 0 ? (salvage / 10 ** 18).toFixed(3) : ''} {salvage > 0 ? 'SALVAGE' : ''}
          </span>
          <span>
            {mineral > 0 ? (mineral / 10 ** 18).toFixed(3) : ''} {mineral > 0 ? 'MINERAL' : ''}
          </span>
          <span>{unexplored ? 'UNEXPLORED' : ''}</span>
          <span>{star ? 'STAR' : ''}</span>
        </Row>
      </PlaceHeader>
      <PlaceBody>
        {mineral > 0 && currentLocation ? (
          <Button type="button" onClick={sendMineTx}>
            {pending ? 'pending...' : 'MINE'}
          </Button>
        ) : (
          ''
        )}
        {salvage > 0 && currentLocation ? (
          <Button type="button" onClick={sendCollectTx}>
            {pending ? 'pending...' : 'COLLECT'}
          </Button>
        ) : (
          ''
        )}
        {refinery && currentLocation ? (
          <Button type="button" onClick={sendRefineTx}>
            {pending ? 'pending...' : 'REFINE'}
          </Button>
        ) : (
          ''
        )}
        {canTravel && !currentLocation && distance < 4 && fleetSize >= 25 ? (
          <Button type="button" onClick={sendTravelTx}>
            {pending ? 'pending...' : 'TRAVEL'}
          </Button>
        ) : (
          ''
        )}
        {unexplored && distance < 2 ? (
          <Button type="button" onClick={sendExploreTx}>
            {pending ? 'pending...' : 'EXPLORE'}
          </Button>
        ) : (
          ''
        )}
        {shipyard && refinery && 
          <Button type='button' onClick={sendTakeoverTx} >Takeover Shipyard</Button> }
        <Row style={{ marginTop: 5, color: '#289794', fontSize: 11 }}>
          <span>Travel Cost (NOVA): {!currentLocation ? travelCost : ''}</span>
          <span>Travel Cooldown: {!currentLocation ? <span>{travelCooldown} minutes</span> : ''}</span>
          {unexplored && <span>Exlpore Cost (NOVA): {(exploreCost/10**18).toFixed(2)}</span>}
        </Row>
      </PlaceBody>
    </Body>
  )
}
export default LocationCard
