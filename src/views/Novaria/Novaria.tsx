import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import { Button, darkColors, useWalletModal } from '@pancakeswap-libs/uikit'
import ModalVideo from 'react-modal-video'
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import showCountdown from 'utils/countdownTimer'
import HowToPlay from 'views/Dashboard/components/HowToPlay'
import NovariaTeaser from 'views/Dashboard/components/NovariaTeaser'
import logo from './assets/novariaLogoBig.png'
import StartMenu from './components/StartMenu'
import 'react-modal-video/scss/modal-video.scss'

const Column = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  // width: 99%;
  // max-width: 700px;
`

const SubHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: white;
  text-align: center;
  margin-top: 10px;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 26px;
    flex-wrap: nowrap;
  }
`

const ExternalButton = styled(Button)`
  margin: 5px 5px;
`

const Description = styled.div`
  margin: 10px;
  font-size: 1rem;
`

const TeaserVideo = styled.iframe`
  height: 200px;
  width: 400px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 400px;
    width: 800px;
  }
  aspect-ratio: 16/9;
  border-radius: 5px;
`

const GameInfo = styled.div`
  padding: 10px;
  background: #0c0b15;
  border: 1px solid ${darkColors.backgroundDisabled};
  border-radius: 5px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonRow = styled.div``

const LiveGameLink = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  margin-bottom: 5px;
`
const Novaria: React.FC = () => {
  ReactGA.initialize('UA-206876567-1', { gaOptions: { siteSpeedSampleRate: 100 } })
  const { account, connect, reset } = useWallet()
  const connected = account !== null
  const [isOpen, setOpen] = useState(false)
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  const handleConnectWalletClick = () => {
    ReactGA.event({
      category: 'Legend of Novaria',
      action: 'connect wallet',
      label: 'button',
    })
    ReactPixel.trackSingle('964799387574791', 'InitiateCheckout')
    onPresentConnectModal()
  }

  const launchCountdown = showCountdown(new Date(1647547200000))

  const waitingToLaunch = new Date(1647547200000) > new Date()

  return (
    <Page>
      <Column>
        <LiveGameLink>
          <a href="/overview" rel="noopener noreferrer" target="blank">
            <ExternalButton type="button">VIEW LIVE GAME!</ExternalButton>
          </a>
        </LiveGameLink>
        <SubHeading>
          <GameInfo>
            {connected ? <StartMenu /> : <Button onClick={handleConnectWalletClick}>CONNECT WALLET</Button>}
            <ButtonRow>
              <a
                href="https://swap.novadex.finance/#/swap?outputCurrency=0x56E344bE9A7a7A1d27C854628483Efd67c11214F"
                rel="noopener noreferrer"
                target="blank"
              >
                <ExternalButton type="button">Buy NOVA</ExternalButton>
              </a>
              <a href="https://discord.gg/nsxxXNjkqU" rel="noopener noreferrer" target="blank">
                <ExternalButton type="button">Official Discord</ExternalButton>
              </a>
            </ButtonRow>
            <Description>
              Legend of Novaria is a play to earn MMO strategy game built on the Binance Smart Chain fueled by NOVA.
              Players can build fleets, mine mineral, fight other players in epic space battles, and explore an ENDLESS
              universe.
            </Description>
          </GameInfo>
          <GameInfo>
            <TeaserVideo
              src="https://www.youtube.com/embed/VRH2LvKXKEQ?playlist=VRH2LvKXKEQ&autoplay=1&mute=1&loop=1"
              title="YouTube video player"
            />
          </GameInfo>
        </SubHeading>
        <HowToPlay />
      </Column>
    </Page>
  )
}

export default Novaria
