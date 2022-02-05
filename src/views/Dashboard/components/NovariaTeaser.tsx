import React, {useState} from 'react'
import { Card, CardBody, CardHeader, CardFooter, Text, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import NovariaLogo from '../assets/novariaLogoMain.png'
import VideoModal from './VideoModal'



const Body = styled.div`
    display: flex;
    justify-content: center;
    background-position: center;
    background-size: cover;
   // background-image: url('/images/home/mainBackground-dark.jpg');
    background-image: url('/images/home/clouds-min.jpg');
    height: 500px;
    width: 100%;
    border: 2px solid #00aaff;
    border-radius: 30px;
`

const Img = styled.img`
    
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index:0;
    margin-top: 55px;
`

const NovariaTeaser = ({
    title,
  }: {
    title: string
  }) => {

    return(
      <Body id={title}>
          {/* <a href="/novaria">
            <Img src={NovariaLogo} alt="Legend of Novaria" />
        </a> */}
          <VideoModal />
      </Body>
    
    )
}

export default NovariaTeaser