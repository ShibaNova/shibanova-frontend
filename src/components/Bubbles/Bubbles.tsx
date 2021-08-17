import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
`
type Props = {
  numberOfBubbles: number
}
const Bubbles: React.FC<Props> = ({ numberOfBubbles }) => (
  <Wrapper>
    {Array.from({ length: numberOfBubbles }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className="circle-container" key={index} >
        <div className="circle" />
      </div>
    ))}
  </Wrapper>
)

export default Bubbles
