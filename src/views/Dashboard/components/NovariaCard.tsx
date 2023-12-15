import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import showCountdown from 'utils/countdownTimer'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: center bottom;
  background-size: cover;
  background-image: url('/images/home/act2_banner.png');
  background-repeat: no-repeat;
  min-height: 500px;
  width: 95%;
  margin: 20px auto;
  border: 2px solid #00aaff;
  border-radius: 30px;
  padding: 10px;

  @media screen and (min-width: 200px) and (max-width: 355px) {
    background-size: contain;
    background-position: center top;
    min-height: 180px;
  }
  @media screen and (min-width: 356px) and (max-width: 460px) {
    background-size: contain;
    background-position: center top;
    min-height: 200px;
  }
  @media screen and (min-width: 461px) and (max-width: 640px) {
    background-size: contain;
    background-position: center top;
    min-height: 230px;
  }
  @media screen and (min-width: 641px) and (max-width: 740px) {
    background-size: contain;
    background-position: center top;
    min-height: 270px;
  }

  @media screen and (min-width: 2000px) and (max-width: 2560px) {
    background-size: cover;
    background-position: center top;
    min-height: 700px;
  }
  @media screen and (min-width: 2560px) {
    background-size: contain;
    background-position: center top;
    min-height: 800px;
   max-width: 2720px;
  }
`

const ImgCountdown = styled.div`
  font-size: 1.8em;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  align-self: center;
  color: white;
  background: rgb(1, 191, 253);
  background: linear-gradient(90deg, rgba(1, 191, 253, 1) 0%, rgba(0, 22, 76, 1) 20%, rgba(0, 3, 8, 1) 94%);
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 20px;
  text-align: center;
  border: 2px solid white;

  @media screen and (min-width: 200px) and (max-width: 355px) {
    font-size: 0.875em;

  }
  @media screen and (min-width: 356px) and (max-width: 640px) {
    font-size: 1.2em;
  }
  @media screen and (min-width: 641px) and (max-width: 740px) {
    font-size: 1.4em;
  }
`

const NovariaCard = ({ title }: { title: string }) => {
  const launchCountdown = showCountdown(new Date(1702746000000))

  return (
    <Body id={title}>
      <a href="/legend-of-novaria" style={{ display: 'flex', marginTop: 'auto' }}>
        <ImgCountdown>
          The Battle Continues In:
          <br />
          {launchCountdown}
        </ImgCountdown>
      </a>
      {/* <VideoModal /> */}
    </Body>
  )
}

export default NovariaCard
