import React from 'react'
import styled from 'styled-components'
import {
  useTravel,
  useRefine,
  useCollect,
  useExplore,
  useGetTravelCooldown,
  useGetFleetTravelCost,
} from 'hooks/useNovaria'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { travel } from 'utils/callHelpers'

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
    cursor:pointer;
    border: 1px solid #5affff;
    background: transparent;
    color: #5affff;
    width: 110px;
    margin: 5px;
    &:hover {
        background-color: #5affff;
        color: black
    }
`

const Row = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
`
 
const LocationCard = ({placename, placetype, mineral, salvage, shipyard, refinery, placeX, placeY, fleetLocation, isMining}) => {
    const {account} = useWallet()
    const isCurrentLocation = (fleetLocation.X === placeX && fleetLocation.Y === placeY)
    const travelCost = useGetFleetTravelCost(account, placeX, placeY) / 10**18
    const travelCooldown = (new Date(useGetTravelCooldown(account, placeX, placeY) *1000)).toLocaleString()
    console.log('travel cooldown', travelCooldown)

    // const HandleTravel = () =>{

    // }


    return(
        <Body>
            {placename === 'Haven' ? <HavenImageCard /> : ''}
            {placetype === 'empty' ? <EmptyImageCard /> : ''}
            {shipyard && !refinery ? <ShipyardImageCard /> : ''}
            {refinery && !shipyard ? <RefineryImageCard /> : ''}
            {refinery && shipyard && placename !== 'Haven' ? <ShipyardRefineryImageCard /> : ''}
            {placetype === 'asteroid' ? <AsteroidImageCard /> : ''}
            {placetype === 'star' ? <StarImageCard /> : ''}
            {placetype === 'hostile' ? <HostileImageCard /> : ''}
            {placetype === '' ? <UnexploredImageCard /> : ''}
            {isMining === true ? <MiningImageCard /> : ''}
            <PlaceHeader>
                <Row>
                    <Name>
                        {placename}
                        {placetype === 'empty' ? 'EMPTY SPACE' : ''}
                        {placetype === 'hostile' ? 'HOSTILE SPACE' : ''}
                    </Name>
                    <Location>
                        ({placeX},{placeY})
                    </Location>
                </Row>
                <Row style={{fontSize: 12, marginTop: 3}}>
                    <span>
                        {shipyard === true ? 'SHIPYARD' : ''}
                    </span>
                    <span>
                        {refinery === true ? 'REFINERY' : ''}
                    </span>
                    <span>
                        {salvage > 0 ? salvage : ''} {salvage > 0 ? 'SALVAGE' : ''}
                    </span>
                    <span>
                        {mineral > 0 ? mineral : ''} {mineral > 0 ? 'MINERAL' : ''}
                    </span>
                    <span>
                        {placetype === '' ? 'UNEXPLORED' : ''}
                    </span>
                    <span>
                        {placetype === 'star' ? 'STAR' : ''}
                    </span>
                </Row>
            </PlaceHeader>
            <PlaceBody>
                {mineral > 0 ? <Button type='button' >MINE</Button> : ''}
                {salvage > 0 ? <Button type='button' >COLLECT</Button> : ''}
                {refinery ? <Button type='button' >REFINE</Button> : '' }
                {placetype !== 'star' && placetype !== 'hostile' && !isCurrentLocation ? <Button type='button' >TRAVEL</Button> : ''}
                {placetype === '' ? <Button type='button' >EXPLORE</Button> : ''}
                <Row style={{marginTop: 5, color:'#289794'}}>
                    <span>Travel Cost (NOVA): {!isCurrentLocation ? travelCost : ''}</span>
                    <span>Travel Cooldown: {!isCurrentLocation ? travelCooldown : ''}</span>
                </Row>
            </PlaceBody>
        </Body>
    )
}
export default LocationCard