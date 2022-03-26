import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  useGetBattlesAtLocation,
  useGetPlayerBattleStatus,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetMaxMineralCapacity,
  useGetPlayer,
  useGetPlayerCount,
  useGetFleetMineralRefined,
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import useSound from 'use-sound'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import OpenBattlesTable from '../Location/OpenBattlesTable'
import logo from '../assets/novariaLogoMain.png'
import backgoundSfx from '../assets/sounds/background.mp3'

const Page = styled.div`
  background-size: cover;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`

const Row = styled.div`
  flex-wrap: wrap;
  display: flex;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: nowrap;
  }
`
const Body = styled.div`
  margin: 20px 10px 200px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  border: 1px solid #5affff;
  padding: 10px;
  color: white;
`

const Header = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
`

const Text = styled.div`
  font-size: 15px;
  text-align: left;
  max-width: 900px;
`

const OpenBattlesCard = styled.div`
  margin: 20px 10px;
  padding: 10px;
  max-height: 50%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
  border: 1px solid #5affff;
  background: #00000099;
  
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
`

const SubHeader = styled.div`
  font-size: 0.75rem;
  color: gray;
`

const StatsSection = styled.div`
  display: flex;
  justify-content: space-between;
`

const Overview: React.FC = () => {
  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const player = useGetPlayer(account.toString())
  const playerEXP = player.experience
  const playerName = player.name
  const playerBattleStatus = useGetPlayerBattleStatus(account)
  const refinedMineral = (useGetFleetMineralRefined(account) / 10 ** 18).toFixed(2)

  const playerCount = useGetPlayerCount()
  const currentTime = Math.round(new Date().getTime() / 1000)
  const recentLocationBattles = useGetBattlesAtLocation(fleetLocation.X, fleetLocation.Y, 2, currentTime)

  const [isPlayingBackgroundSfx, setIsPlayingBackgroundSfx] = useState(false)
  const [playBackgroundSfx] = useSound(backgoundSfx, {onplay: () => setIsPlayingBackgroundSfx(true)})

  useEffect(() => {
    if (!isPlayingBackgroundSfx) {
      playBackgroundSfx()
    }
  })

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
        <GameMenu pageName="overview" />
        <Body>
          <div style={{ background: '#11427399', padding: 15, textAlign: 'center' }}>
            <img src={logo} style={{}} alt="novaria logo" />
            <Header>Welcome to the Legend of Novaria</Header>
            <Text>
              You are about to embark on a journey to explore the world of Novaria. The mysterious Draken forces have
              pushed Humanity to the edge of the galaxy. They have been repelled for now, but we never know when they
              will strike again.
              <br />
              <br />
              By building ships, mining planets, and refining mineral into NOVA, you can help humanity rebuild. Along
              the way, you will meet friends and foes - are you cunning enough to figure out who will help you or
              destroy you?
              <br />
              <br />
              The journey will be perilous - the challenges will seem insurmountable - but the time to act is NOW! Are
              you ready to begin your mission?
              <br />
              <br />
              Good Luck!
              <br />
              <br />
              <a
                href="https://docs.shibanova.io/shibanova-documentation/legend-of-novaria"
                rel="noopener noreferrer"
                target="blank"
                style={{ color: '#5affff' }}
              >
                [LEARN MORE]
              </a>
            </Text>
          </div>
          <div style={{ background: '#11427399', padding: 15, textAlign: 'center' }}>
            <StatsSection>
              <span>Total Players: {playerCount}</span>
              <span>Your Total Refined Minerals: {refinedMineral}</span>
            </StatsSection>

            <OpenBattlesCard>
              <Header>Your Recent Battles</Header>
              <SubHeader>(Only shows battles at your current location)</SubHeader>
              <OpenBattlesTable
                battles={recentLocationBattles}
                status={playerBattleStatus}
                currentLocation
                resolved
                account={account}
              />
            </OpenBattlesCard>
          </div>
        </Body>
      </Row>
    </Page>
  )
}

export default Overview
