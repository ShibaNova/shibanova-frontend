import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap-libs/uikit'
import {
  useGetBattlesAtLocation,
  useGetPlayerBattleStatus,
  useGetFleetLocation,
  useGetFleetMineral,
  useGetMaxMineralCapacity,
  useGetPlayer,
  useGetPlayerCount,
  useGetFleetMineralRefined,
  useGetFleetSize,
  useGetMaxFleetSize,
  useGetAttackPower,
  useGetMiningCapacity,
  useGetCurrentMiningCooldown,
  useGetCurrentTravelCooldown,
  useGetPlayerBattle,
  useGetShipyards,
  useGetShipClasses,
  useGetShips,
  useGetPlayerExists,
  useCheckReferrals,
  useGetReferralBonus,
  useGetTotalReferrals,
} from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'
import GameHeader from '../components/GameHeader'
import GameMenu from '../components/GameMenu'
import GameRankings from '../components/GameRankings'
import UpdateBanner from '../components/Banner'
import YourFleetStats from '../Location/YourFleetStats'
import OpenBattlesTable from '../Location/OpenBattlesTable'
import ShipyardList from './ShipyardStats/ShipyardList'
import ChatButton from '../components/ChatBox/ChatButton'
import logo from '../assets/novariaLogoMain.png'

const Page = styled.div`
  background-size: cover;
  color: #5affff;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
`
 
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const UpperSection = styled.div`
  background: #11427399;
  padding: 15px;
  text-align: center;
`
const UpperCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 50vw;
  }

`

const MainLogo = styled.img`
  max-width: 60vw;
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
  // max-height: 50%;
  min-height: 200px;
  min-width: 350px
  max-width: 450px;
  border: 1px solid #5affff;
  background: #00000099;
  
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
`

const StatsContainer = styled.div`
  margin: 20px 10px;
  padding: 10px;
  max-width: 450px;
  border: 1px solid #5affff;
  background: #00000099;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 450px;
  }
  
  overflow-y: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  max-height: 500px;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

const StatsRow = styled.div`
  display:flex;
  justify-content: space-between;
  text-align: initial;
  flex-wrap: wrap;
`

const StatsCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;

`

const StatsItem = styled.div`
  margin: 5px 0px;

`

const SubHeader = styled.div`
  font-size: 0.75rem;
  color: gray;
`

const StatsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #11427399;
  padding: 15;
  text-align: center;
`

const ShipyardSubHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: #289794;
`

const RefButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  color: white;
  font-size: .65rem;
`

const RefSection = styled.div`
  margin-top: 10px;
  color: gold;
  text-align: center;
  max-width: 80vw;
`

const RewardsSection = styled.div`

`

const RewardsButtons = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  background: transparent;
  color: #5affff;
  // width: 110px;
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

const Overview: React.FC = () => {
  const account = useContext(ConnectedAccountContext)
  const fleetLocation = useGetFleetLocation(account)
  const fleetMineral = useGetFleetMineral(account)
  const mineralCapacity = useGetMaxMineralCapacity(account)
  const player = useGetPlayer(account.toString())
  const playerEXP = player.experience
  const playerName = player.name
  const playerBattleStatus = useGetPlayerBattleStatus(account)
  const refinedMineral = (useGetFleetMineralRefined(account)/10**18).toFixed(2)
  const totalRefined = Number(refinedMineral).toFixed(0)
  const playerExists = useGetPlayerExists(account)
  const fleetSize = useGetFleetSize(account)
  const maxFleetSize = useGetMaxFleetSize(account)
  const fleetPower = useGetAttackPower(account)
  const miningCapacity = useGetMiningCapacity(account)
  const currentTravelCooldown = new Date(useGetCurrentTravelCooldown(account) * 1000)
  const currentMiningCooldown = new Date(useGetCurrentMiningCooldown(account) * 1000)
  const playerBattleInfo = useGetPlayerBattle(account)
  const shipClasses = useGetShipClasses()
  const playerFleet = useGetShips(account)

  const shipyards = useGetShipyards()

  const playerCount = useGetPlayerCount()
  const currentTime = Math.round((new Date()). getTime() / 1000)
  const recentLocationBattles = useGetBattlesAtLocation(fleetLocation.X, fleetLocation.Y, 2, currentTime)

  const [copySuccess, setCopySuccess] = useState('')
  const refLink = `https://shibanova.io/legend-of-novaria?ref=${account}`
  const [pending, setPending] = useState(false)
  const rewardsAmount = useCheckReferrals(account) * 25
  const rewardsDisabled = rewardsAmount <= 0 || pending
  const totalReferrals = useGetTotalReferrals(account)

  const { onGet } = useGetReferralBonus(account)

  const sendGetRewardsTx = async () => {
    setPending(true)
    try {
      await onGet()
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPending(false)
    }
  }

  function copyToClipboard(e) {
    navigator.clipboard.writeText(refLink)
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    // e.target.focus();
    setCopySuccess('Copied!')
  }
  
  

  return (
    <Page>
      <UpdateBanner />
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
          <UpperSection>
            <StatsRow>
              <UpperCol>
                <MainLogo src={logo} alt="novaria logo" />
                <Header>Welcome to the Legend of Novaria</Header>
                <Text>
                  You are about to embark on a journey to explore the world of Novaria.
                  The mysterious Draken forces have pushed Humanity to the edge of the galaxy. They have been repelled for now, but we never know when they will strike again.
                  <br />
                  <br />
                  By building ships, mining planets, and refining mineral into NOVA, you can help humanity rebuild. Along the way, you will meet friends and foes - are you cunning enough to figure out who will help you or destroy you?            
                  <br />
                  <br />
                  The journey will be perilous - the challenges will seem insurmountable - but the time to act is NOW!  Are you ready to begin your mission?
                  <br />
                  <br />
                  Good Luck! - is this working?
                  <br />
                  <br />
                  <a href='https://docs.shibanova.io/shibanova-documentation/legend-of-novaria' rel='noopener noreferrer' target='blank' style={{color:'#5affff'}}>[LEARN MORE]</a>
                </Text>
               
                <RefSection>
                  <div>
                    *NEW* Refer a friend and get rewarded 25 NOVA when they sign up!
                  </div>
                  <div>
                    <RefButton onClick={copyToClipboard}>Copy: {refLink}</RefButton> 
                    {' '}{copySuccess}
                  </div>
                  <RewardsSection>
                    <RewardsButtons disabled={rewardsDisabled} onClick={sendGetRewardsTx}>
                      Collect {rewardsAmount} NOVA Bonus
                    </RewardsButtons>
                  </RewardsSection>
                </RefSection>
              </UpperCol>
              <GameRankings
                exp={playerEXP}
                playerName={playerName}
                playerTotalMineral={totalRefined}
                playerAttack={fleetPower}
                playerSize={fleetSize} 
                playerLocation={fleetLocation}
              />
              {/* <ChatButton playerExists={playerExists} playerName={playerName} /> */}
            </StatsRow>
          </UpperSection>
          <StatsSection>
            
            <OpenBattlesCard>
              <Header>My Recent Battles</Header>
              <SubHeader>(Only shows battles at your current location)</SubHeader>
              <OpenBattlesTable
                battles={recentLocationBattles}
                status={playerBattleStatus}
                currentLocation
                resolved
                account={account}
              />
            </OpenBattlesCard>
            <StatsContainer>
              <Header>Stats</Header> 
              <StatsRow>
                <StatsCol>
                  <StatsItem>Total Players: </StatsItem>
                  <StatsItem>My Total Referrals: </StatsItem>
                  <StatsItem>My Total Refined Mineral: </StatsItem>
                </StatsCol>
                <StatsCol>
                  <StatsItem>{playerCount}</StatsItem>
                  <StatsItem>{totalReferrals}</StatsItem>
                  <StatsItem>{refinedMineral}</StatsItem>
                </StatsCol>
              </StatsRow>
              <Header style={{marginTop:5}}>My Fleet</Header>
              <YourFleetStats 
                account = {account}
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
                fleetLocation={fleetLocation} />
            </StatsContainer>
            <StatsContainer>
              <Header>Shipyards</Header>
              <ShipyardSubHeader>
                <span style={{textAlign:'left'}} >Name</span>
                <span style={{textAlign:'right'}} >Location</span>
                <span style={{textAlign:'right'}} >Takeover?</span>
              </ShipyardSubHeader>
                {shipyards.map((shipyard) => {
                  return(
                    <ShipyardList shipyard={shipyard} />
                  )
                })}

            </StatsContainer>
          </StatsSection>
        </Body>
      </Row>
    </Page>
  )
}

export default Overview
