import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import {io} from 'socket.io-client'

const socket = io('https://radiant-taiga-26464.herokuapp.com/', {
    autoConnect: false
})

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
  grid-template-columns: .3fr 1.2fr 1fr 1fr 1fr 1fr 1fr;
  color: #289794;
  font-size: .6rem;
  margin-bottom: 5px;  
  white-space: nowrap;
  text-align: center;

 

  ${({ theme }) => theme.mediaQueries.md} {
     font-size: .8rem;
  }
`

const RankRow = styled.div`
    display: grid;
    grid-template-columns: .3fr 1.2fr 1fr 1fr 1fr 1fr 1fr;
    font-size: .6rem;
    white-space: nowrap;
    padding: .1rem 0;
        
    ${({ theme }) => theme.mediaQueries.md} {
       font-size: .8rem;
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

const GameRankings = ({exp, playerName, playerSize, playerAttack, playerTotalMineral, playerLocation}) => {
    const [rankings, setRankings] = useState([])
    const [rankingsByExp, setRankingsByExp] = useState([])

    
  
    useEffect (() => {
        
        socket.connect()
        socket.on('connect', () => {
            console.log(`socket connected: ${socket.connected}`)
        })
    }, [])


    useEffect(() => {
        const userData = {
            name: playerName,
            size: playerSize,
            attack: playerAttack,
            experience: exp,
            totalMineral: playerTotalMineral,
            location: `(${playerLocation.X},${playerLocation.Y})`
        }
        if (playerName !== '') {
            socket.emit('send_rankings', userData)
            console.log(`sent user data: ${userData}`)
        }
    }, [playerName, exp, playerAttack, playerSize, playerTotalMineral, playerLocation.X, playerLocation.Y])

    useEffect(() => {
        socket.on('receive_rankings', (data) => {
            
            setRankingsByExp(data.sort((a, b) =>
                (Number(a.experience) > Number(b.experience) ? -1 : 1)
                )
            )
        })
    }, [])

    return (
        <Wrapper>
            <Header>Active Player Rankings</Header>
            <LabelRow>
                <LeftSpan>#</LeftSpan>
                <LeftSpan>Name</LeftSpan>
                <span>Exp</span>
                <span>Size</span>
                <span>Atk</span>
                <span>Refined</span>
                <span>Coords</span>
            </LabelRow>
            <ScrollSection>
                {rankingsByExp.map((ranking) => {
                    return (
                        <RankRow>
                            <span>{rankingsByExp.indexOf(ranking)+1}.  </span>
                            <span>{ranking.name}</span>
                            <NumberSpan>{Number(ranking.experience).toLocaleString()}</NumberSpan>
                            <NumberSpan>{Number(ranking.size).toLocaleString()}</NumberSpan>
                            <NumberSpan>{Number(ranking.attack).toLocaleString()}</NumberSpan>
                            <NumberSpan>{Number(ranking.totalMineral).toLocaleString()}</NumberSpan>
                            <NumberSpan>{ranking.location}</NumberSpan>
                        </RankRow>
                    )
                })}
            </ScrollSection>
        </Wrapper>
    )
}
export default GameRankings