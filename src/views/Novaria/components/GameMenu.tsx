import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap-libs/uikit'
import overview from '../assets/overviewMenu.png'
import shipyard from '../assets/shipyardMenu.png'
import starmap from '../assets/starmapMenu.png'
import location from '../assets/locationMenu.png'
import flag from '../assets/menuFlag.png'

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;

  margin-right: 15px;
  margin-top: 10px;

  width: 140px;
`

const SmallFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 20px 0;
  margin-top: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    margin-left: 0px;
    width: 60px;
  }
`

const Link = styled.a`
  padding: 6px 8px 6px 16px;
  link-decoration: none;
  font-size: 15px;
  color: #abc8e2;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`

const IconContainer = styled.div<{ active: boolean }>`
  border-bottom: 2px ${(props) => (props.active ? 'solid' : 'transparent')};
`

const Icon = styled.img`
  height: 40px;
  width: auto;
`

const Flag = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: absolute;
  left: 55px;

  opacity: ${(props) => (props.active ? 1 : 0)};

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    color: #5affff;
  }
`

const ToggleButton = styled.button`
  cursor: pointer;
  color: gray;
  background: transparent;
  border: none;
`

// Local storage key we're using to store game menu open / closed status.
const GAMEMENU_IS_OPEN_KEY = 'novaria_gamemenu_is_open'

const getMenuOpenStatus = () => {
  const value = localStorage.getItem(GAMEMENU_IS_OPEN_KEY)
  return value ? JSON.parse(value) : true
}

const setMenuOpenStatus = (status: boolean) => {
  localStorage.setItem(GAMEMENU_IS_OPEN_KEY, JSON.stringify(status))
}

const MENU_DATA = [
  { href: '/overview', title: 'OVERVIEW', internalPageName: 'overview', img: { src: overview, alt: 'game overview' } },
  { href: '/shipyard', title: 'SHIPYARD', internalPageName: 'shipyard', img: { src: shipyard, alt: 'game shipyard' } },
  { href: '/map', title: 'STAR MAP', internalPageName: 'starmap', img: { src: starmap, alt: 'game star map' } },
  { href: '/location', title: 'LOCATION', internalPageName: 'location', img: { src: location, alt: 'game location' } },
]

const GameMenu = ({ pageName }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  const [open, setOpen] = useState((): boolean => {
    return isMobile ? false : getMenuOpenStatus()
  })

  useEffect(() => {
    setOpen(isMobile ? false : getMenuOpenStatus())
  }, [isMobile])

  const toggleViewMenu = () => {
    setOpen((prevState) => {
      setMenuOpenStatus(!prevState)
      return !prevState
    })
  }

  if (isMobile) {
    return (
      <SmallFrame>
        {MENU_DATA.map((item) => (
          <Link href={item.href}>
            <IconContainer active={pageName === item.internalPageName}>
              <Icon src={item.img.src} alt={item.img.alt} title={item.title} />
            </IconContainer>
          </Link>
        ))}
      </SmallFrame>
    )
  }

  return (
    <div>
      {open ? (
        <Frame>
          <ToggleButton type="button" onClick={toggleViewMenu} style={{padding: "0px 0px 0px 22px"}}>
            &lt;&lt;
          </ToggleButton>
          {MENU_DATA.map((item) => (
            <Link href={item.href} key={item.internalPageName}>
              <IconContainer active={pageName === item.internalPageName}>
                <Icon src={item.img.src} alt={item.img.alt} title={item.title} />
              </IconContainer>
              <Flag active={pageName === item.internalPageName} aria-haspopup="true">
                {item.title}
                <img src={flag} alt="flag" />
              </Flag>
            </Link>
          ))}
        </Frame>
      ) : (
        <SmallFrame>
          <ToggleButton type="button" onClick={toggleViewMenu}>
            &gt;&gt;
          </ToggleButton>
          {MENU_DATA.map((item) => (
            <Link href={item.href} key={item.internalPageName}>
              <IconContainer active={pageName === item.internalPageName}>
                <Icon src={item.img.src} alt={item.img.alt} title={item.title} />
              </IconContainer>
            </Link>
          ))}
        </SmallFrame>
      )}
    </div>
  )
}
export default GameMenu
