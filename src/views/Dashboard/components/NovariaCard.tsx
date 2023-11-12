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
    min-height: 500px;
    width: 95%;
    margin: 20px auto;
    border: 2px solid #00aaff;
    border-radius: 30px;
    paddingL 10px;
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
`

const NovariaCard = ({ title }: { title: string }) => {
  const launchCountdown = showCountdown(new Date(1702630800000))

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
