import React from 'react'
import styled from 'styled-components'

const ImgWrap = styled.div`
  position: relative;
  background-image: url('/images/novaria/borderTLBR.png'), url('/images/novaria/borderTR.png'),
    url('/images/novaria/borderTLBR.png'), url('/images/novaria/borderBL.png');
  background-position: top 3px left 3px, top 5px right 10px, bottom 3px right 3px, bottom 5px left 10px;
  background-repeat: no-repeat;
  background-color: #00000080;
  
  @media (max-width: 476px) {
    width: 100%
  }
`

const ChildWrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 10px;
  border: 2px solid #a0bbd5;
  position: relative;

  @media (max-width: 1020px) {
    flex-direction: column;
  }
`

const ShipyardBodyWrapper = ({ children }) => {
  return (
    <ImgWrap>
      <ChildWrapper>{children}</ChildWrapper>
    </ImgWrap>
  )
}

export default ShipyardBodyWrapper
