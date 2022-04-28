import React from 'react'
import styled from 'styled-components'
import Modal from '../components/CardModal'
import moleCard from '../assets/moleCard.png'
import viperCard from '../assets/viperCard.png'
import viperSwarmCard from '../assets/viperSwarm.png'
import unknownCard from '../assets/newShipCard.png'
import gorianCard from '../assets/gorianCard.png'
import fireflyCard from '../assets/fireflyCard.png'
import lancerCard from '../assets/lancerSmall.png'

interface PlayerModalProps {
  shipclass: string
  onDismiss?: () => void
} 

const Img = styled.img`
  margin-top: 20px;
  background-color: black;
  border-radius: 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 25%;
    margin-left: auto;
    margin-right: auto;
  }
`

const Message = styled.div`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  color: white;
`

const ShipCardModal: React.FC<PlayerModalProps> = ({ shipclass, onDismiss }) => {
  return (
    <Modal onDismiss={onDismiss}>
      {shipclass === 'Viper' && <Img src={viperCard} alt="viper" />}
      {shipclass === 'Viper Swarm' && <Message>Swarm class ships are special in that they have X times the stats of the base ship 
         but take up the same size (i.e. viper swarm has 5x stats, but only 1 size). This allows you to build more ships faster 
         and carry more ships, but it comes with an increased cost.</Message>}
      {shipclass === 'Viper Swarm' && <Img src={viperSwarmCard} alt="viper swarm" />}
      {shipclass === 'P.U.P.' && <Img src={moleCard} alt="PUP" />}
      {shipclass === 'Firefly' && <Img src={fireflyCard} alt="firefly" />}
      {shipclass === 'Gorian' && <Img src={gorianCard} alt="gorian" />}
      {shipclass === 'Lancer' && <Img src={lancerCard} alt="lancer" />}
      {shipclass === 'Unknown' && <Img src={unknownCard} alt="coming soon" />}
    </Modal>
  )
}

export default ShipCardModal
