import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import NovariaLogo from '../assets/novariaLogoMain.png'

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-position: center bottom;
    background-size: cover;
    background-image: url('/images/home/mainBackground-dark.jpg');
    height: 500px;
    width: 95%;
    margin: 20px auto;
    border: 2px solid #00aaff;
    border-radius: 30px;
    paddingL 10px;
`

const Img = styled.img`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  align-self: center;
`

const NovariaCard = ({ title }: { title: string }) => {
  return (
    <Body id={title}>
      <a href="/legend-of-novaria" style={{ display: 'flex' }}>
        <Img src={NovariaLogo} alt="Legend of Novaria" />
      </a>
      <a href="/legend-of-novaria" style={{ display: 'flex' }}>
        <Button style={{ margin: '10px auto' }}>The Battle is Coming</Button>
      </a>
      {/* <VideoModal /> */}
    </Body>
  )
}

export default NovariaCard
