import React, { useState } from 'react'
import styled from 'styled-components'
import overview from '../assets/overviewMenu.png'
import shipyard from '../assets/shipyardMenu.png'
import starmap from '../assets/starmapMenu.png'
import location from '../assets/locationMenu.png'
import flag from '../assets/menuFlag.png'

const Frame = styled.div`
  width: 140px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  margin-top: 10px;
`

const SmallFrame = styled.div`
  //width: 60px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 25px;
  margin-top: 10px;
  @media (min-width: 420px) {
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
  left: 45px;

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

const MENU_DATA = [
  { href: '/overview', title: 'OVERVIEW', internalPageName: 'overview', img: { src: overview, alt: 'game overview' } },
  { href: '/shipyard', title: 'SHIPYARD', internalPageName: 'shipyard', img: { src: shipyard, alt: 'game shipyard' } },
  { href: '/map', title: 'STAR MAP', internalPageName: 'starmap', img: { src: starmap, alt: 'game star map' } },
  { href: '/location', title: 'LOCATION', internalPageName: 'location', img: { src: location, alt: 'game location' } },
]

const GameMenu = ({ pageName }) => {
  const [open, setOpen] = useState((): boolean => {
    const value = localStorage.getItem(GAMEMENU_IS_OPEN_KEY)
    return value ? JSON.parse(value) : true
  })

  const toggleViewMenu = () => {
    setOpen((prevState) => {
      localStorage.setItem(GAMEMENU_IS_OPEN_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <div>
      {open === true ? (
        <Frame>
          <ToggleButton type="button" onClick={toggleViewMenu}>
            {open === true ? '<<' : '>>'}
          </ToggleButton>

          {MENU_DATA.map((item) => (
            <Link href={item.href}>
              <Icon src={item.img.src} alt={item.img.alt} title={item.title} />
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
            <Link href={item.href}>
              <Icon src={item.img.src} alt={item.img.alt} title={item.title} />
            </Link>
          ))}
        </SmallFrame>
      )}
    </div>
  )
}
export default GameMenu
