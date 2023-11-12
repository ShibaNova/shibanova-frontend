import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from '@pancakeswap-libs/uikit'
import discordIcon from './Discord.svg'
import coinBrain from './coinBrain.png'
import redditIcon from './redditIcon.png'

const Hero = styled(Flex)`
  flex-direction: column;
  position: relative;
  justify-content: center;
  background: #0c0b15;
  margin: 0px -10px;
  border-top: solid 1px ${({ theme }) => theme.colors.backgroundDisabled};

  // ${({ theme }) => theme.mediaQueries.lg} {
  //   display: flex;
  //   justify-content: flex-end;
  // }

  // ${({ theme }) => theme.mediaQueries.xl} {
  //   // padding: 0 5vw;
  // }
`

const Row = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px 0 0 0;
`

const Col = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Img = styled.img`
  height: 25px;
  margin: 5px 5px;
  background-color: white;
  border-radius: 5px;
`
const Ul = styled.ul`
  list-style-type: none;
  text-weight: bold;
  font-size: 12px;
`

const Footer = () => (
  <Hero>
    <Row>
      <Col>
        <Text style={{ fontSize: '12px', paddingBottom: '0px' }}>NOVA Contract:</Text>
        <Text style={{ fontSize: '8px' }}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://bscscan.com/address/0x56E344bE9A7a7A1d27C854628483Efd67c11214F#code"
          >
            0x56E344bE9A7a7A1d27C854628483Efd67c11214F{' '}
          </a>
        </Text>
        <Row>
          <a target="_blank" rel="noreferrer noopener" href="https://discord.gg/nsxxXNjkqU">
            <Img src={discordIcon} alt="discord" style={{ backgroundColor: 'transparent' }} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/NovaDexAnn">
            <Img src="https://novadex.finance/assets/images/telegram-icon.svg" alt="telegram" />
          </a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.twitter.com/earnwithNovaDEX">
            <Img src="https://novadex.finance/assets/images/twitter-icon.svg" alt="twitter" />
          </a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/earnwithnovadex">
            <Img src="https://novadex.finance/assets/images/instagram-icon.svg" alt="instagram" />
          </a>
          <a target="_blank" rel="noreferrer noopener" href="https://www.reddit.com/r/NovaDEX/">
            <Img src={redditIcon} alt="reddit" />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener noopener"
            href="https://coinbrain.com/coins/0x56e344be9a7a7a1d27c854628483efd67c11214f"
          >
            <Img src={coinBrain} alt="coinBrain" />
          </a>
        </Row>
      </Col>
      <Col>
        <Ul>
          <li style={{ color: 'white', marginTop: '2px' }}>
            <a target="_blank" rel="noreferrer" href="/terms">
              Terms
            </a>
          </li>
          <li style={{ color: 'white', marginTop: '4px' }}>
            <a target="_blank" rel="noreferrer" href="/privacy">
              Privacy
            </a>
          </li>
          <li style={{ color: 'white', marginTop: '4px' }}>
            <a target="_blank" rel="noreferrer" href="https://docs.novadex.finance/novadex-documentation/">
              Documentation
            </a>
          </li>
          <li style={{ color: 'white', marginTop: '4px' }}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.novadex.finance/novadex-documentation/security/audits"
            >
              Audits
            </a>
          </li>
        </Ul>
      </Col>
    </Row>
    <Row style={{ marginBottom: '15px' }}>
      <Text style={{ fontSize: '12px' }}>
        Copyright © {new Date().getFullYear()}. All rights reserved. NovaDEX.finance
      </Text>
    </Row>
  </Hero>
)

export default Footer
