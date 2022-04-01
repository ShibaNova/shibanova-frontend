import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import NeonButton from './NeonButton'
import mainLogo from '../assets/mainlogo.png'

const Body = styled.div`
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
  width: 90%;
  display: flex;
  min-height: 200px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const Announcement = styled(Text)`
  text-align: center;
  text-weight: bold;
  margin-top: 10px;
  align-self: center;
  font-size: 20px;
`

const MainLogo = styled.img`
  // float: left;
  // margin-left: 30px;
`

const ColLeft = styled.div`
  width: 60%;
  align-self: center;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 33%;
  }
`
const ColRight = styled.div`
  width: 90%;
  align-self: center;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 66%;
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  // width: 15%;
  // margin: 0 auto;
`

const SubHero = () => {

    return (
        <Body>
            <ColLeft>
                <a href='/legend-of-novaria'>
                  <MainLogo src={mainLogo} alt="shibanova logo" />
                </a>
                </ColLeft>
            <ColRight>
                <Announcement glowing>
                    <p>Binance Smart Chain DeFi platform featuring an exchange, farming rewards, P2E 4X game, and a daily <span style={{color:"gold"}} > MONEY POT</span> that rewards holders with 75% of all fees! <a href='https://swap.shibanova.io' target='blank' rel='noreferrer noopener'>NOVADEX</a> is the ONLY place to buy $NOVA!</p>
                                      
                </Announcement>
                <ButtonRow>
                    <NeonButton title="DEX" link="#dex" />
                    <NeonButton title="Trade Routes" link="#trade-routes" />
                    <NeonButton title="Legend of Novaria" link="#novaria" />
                </ButtonRow>
            </ColRight>
        </Body>

    )
}

export default SubHero
