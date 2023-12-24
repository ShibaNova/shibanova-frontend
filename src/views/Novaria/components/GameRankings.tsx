import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import fleetABI from 'config/abi/Fleet.json'
import { getContract } from 'utils/web3'
import { getFleetAddress } from 'utils/addressHelpers'

// import PlayerModal from '../Location/PlayersTable/PlayerModal'

const Wrapper = styled.div`
  border: 1px solid #5affff;
  background: #00000099;
  padding: 5px;
  max-height: 560px;
`

const Header = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
  text-align: center;
`

const LabelRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.2fr 1fr 1fr 1fr 1fr 1fr;
  color: #289794;
  font-size: 0.6rem;
  margin-bottom: 5px;
  white-space: nowrap;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.8rem;
  }
`

const RankRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.2fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 0.6rem;
  white-space: nowrap;
  padding: 0.1rem 0;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.8rem;
  }

  :nth-child(odd) {
    background-color: #19323f;
  }
`

const NumberSpan = styled.span`
  text-align: right;
  font-family: monospace;
  font-weight: bold;
`

const LeftSpan = styled.span`
  text-align: left;
`

const ScrollSection = styled.div`
  overflow-y: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  max-height: 500px;
  padding: 5px;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

interface IPlayer {
  name: string
  address: string
  experience: number
  battleId: number
  mineral: number
  battleStatus: number
}

const GameRankings = ({ exp, playerName, playerSize, playerAttack, playerTotalMineral, playerLocation }) => {
  const [rankings, setRankings] = useState([])
  const [rankingsByExp, setRankingsByExp] = useState([])
  const numberOfPlayers = 100

  useEffect(() => {
    const playerList: IPlayer[] = []
    const fleetContract = getContract(fleetABI, getFleetAddress())

    async function fetchPlayer(playerId) {
      const data = await fleetContract.methods.players(playerId).call()
      return data
    }

    async function fetchPlayers() {
      for (let i = 0; i < numberOfPlayers; i++) {
        fetchPlayer(i)
          .then((player: IPlayer) => {
            playerList.push({
              ...player,
              experience: Number(player.experience),
              battleId: Number(player.battleId),
              mineral: Number(player.mineral) / 10 ** 18,
              battleStatus: Number(player.battleStatus),
            })
          })
          .catch((e) => console.error(e))
      }
      setRankings(playerList)
    }

    fetchPlayers()
  }, [])

  return (
    <Wrapper>
      <Header>Player Rankings</Header>
      <LabelRow>
        <LeftSpan>#</LeftSpan>
        <LeftSpan>Name</LeftSpan>
        <span>Exp</span>
        <span>Mineral</span>
      </LabelRow>
      <ScrollSection>
        {rankings
          .sort((a, b) => b.experience - a.experience)
          .map((ranking, i) => {
            return (
              <RankRow>
                <span>{i + 1}. </span>
                <span>{ranking.name}</span>
                <NumberSpan>{ranking.experience.toLocaleString()}</NumberSpan>
                <NumberSpan>{ranking.mineral.toFixed(0)}</NumberSpan>
              </RankRow>
            )
          })}
      </ScrollSection>
    </Wrapper>
  )
}
export default GameRankings
