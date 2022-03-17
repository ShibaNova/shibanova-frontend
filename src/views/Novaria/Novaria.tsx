import React, { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import { Flex, useWalletModal } from '@pancakeswap-libs/uikit'
import ModalVideo from 'react-modal-video'
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import showCountdown from 'utils/countdownTimer'
import logo from './assets/novariaLogoBig.png'
import StartMenu from './components/StartMenu'
import 'react-modal-video/scss/modal-video.scss'

const Page1 = styled(Page)`
  // background-image:url('/images/home/mainBackground-dark.jpg');
  // background-size:cover ;
  // background-position: center;
`

const Body = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`
const breatheAnimation = keyframes`
  // 0% { width: 99%; }
  // 50% {width: 49%; }
  // 100% {width: 0%; }
  // 0% { padding-top: 100px }
  // 50% {padding-top: 50px }
  // 100% {padding-top: 30px }
  0% { opacity: 0.7}
  40% { opacity: 1  }
  70% { opacity: 1  }
  100% { opacity: 0.7 }

`

const Logo = styled.img`
  max-width: 800px;
  padding-top: 20px;
  padding-left: 0px;
  width: 99%;
  animation-name: ${breatheAnimation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
`

const Column = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  width: 99%;
  max-width: 700px;
`

const SubHeading = styled.div`
  
  padding-right: 40px;
  padding-left: 20px;
  padding-bottom: 20px;
  color: white;
  max-width: 800px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 26px;
  }
`

const Button = styled.button`
  cursor: pointer;
  margin: 10px;
  align-self: center;
  padding: 0.5rem 1.25rem;
  font-family: sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow: -2px 4px 4px #091243, 0 0 10px #00d0ff, inset 1px 1px 1px white;
  color: #1fffff;
  border: 2px solid;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 2px 1px 4px rgba(0, 0, 0, 0.3), 2px 4px 3px rgba(3, 0, 128, 0.3),
    0 0 7px 2px rgba(0, 208, 255, 0.6), inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 2px 1px 4px rgba(0, 0, 0, 0.3),
    inset 2px 4px 3px rgba(3, 0, 128, 0.3), inset 0 0 7px 2px rgba(0, 208, 255, 0.6);

`

const Description = styled.div`
  margin: 10px;
  font-size: 1.5rem;
`

const Novaria: React.FC = () => {
  // const account = useContext(ConnectedAccountContext)
  const { account, connect, reset } = useWallet()
  const accountAddress = account === null ? '' : account
  const connected = account !== null
  const [isOpen, setOpen] = useState(false)
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  const handleConnectWalletClick = () => {
    ReactGA.ga('event', 'conversion', { send_to: 'AW-978000460/HXWoCKXCyaIDEMy0rNID' })
    ReactPixel.trackSingle('964799387574791', 'InitiateCheckout')
    onPresentConnectModal()
  }

  const launchCountdown = showCountdown(new Date(1647547200000))

  return (
    <Page1>
      <Body>
        <Column>
          <Logo src={logo} alt="novaria logo" />
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="VRH2LvKXKEQ"
            onClose={() => setOpen(false)}
          />

          <SubHeading>
            <span style={{color:'gold', marginBottom:10}}>The legend begins in</span> <br /> <br />
            <span style={{
              color:'white', 
              fontSize:50, 
              border:'2px solid gold',
              borderRadius:15,
              padding:'.2em'}}>
                 {launchCountdown}
            </span>

            {connected ? <StartMenu />
              : <Button onClick={handleConnectWalletClick}>CONNECT WALLET</Button>
            }


            <br /><br />
            <Description>
              Legend of Novaria is a play to earn MMO strategy game built on the Binance Smart Chain fueled by NOVA.
              Players can build fleets, mine mineral, fight other players in epic space battles, and explore an ENDLESS universe.
            </Description>

            <Button type="button" onClick={() => { setOpen(true) }} >Trailer</Button>
            <a href='https://discord.gg/vQdxbGx9pV' rel='noopener noreferrer' target='blank'><Button type="button" >Official Discord</Button></a>
            <a href='https://docs.shibanova.io/shibanova-documentation/legend-of-novaria' rel='noopener noreferrer' target='blank'><Button type="button">Game Info</Button></a>

          </SubHeading>
        </Column>
      </Body>
    </Page1>
  )
}

export default Novaria
