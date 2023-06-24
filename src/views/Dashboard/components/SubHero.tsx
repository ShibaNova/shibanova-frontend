import React, { useEffect, useState } from 'react'
import { Text, darkColors, Card } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useRefresh from 'hooks/useRefresh'
import NeonButton from './NeonButton'

const Body = styled.div<{ background: string; mobileBackground: string }>`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  display: flex;
  min-height: 600px;
  flex-direction: row;
  z-index: -2;
  background-image: ${(props) => props.mobileBackground};
  background-size: cover;
  -moz-box-shadow: inset 0 0 500em rgba(0, 0, 0, 0.95);
  -webkit-box-shadow: inset 0 0 500em rgba(0, 0, 0, 0.95);
  box-shadow: inset 0 0 500em rgba(0, 0, 0, 0.95);
  border-radius: 5px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    background-image: ${(props) => props.background};
    border-radius: 5px;
  }
`

const Heading = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${darkColors.text};
  margin-bottom: 15px;
`

const Announcement = styled(Text)`
  text-align: left;
  font-size: 1rem;
`

const ColLeft = styled.div`
  width: 80%;
  align-self: center;
  margin-left: 10%;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 40%;
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`

const GridMenu = styled.div`
  display: flex;
  margin-top: -150px;
  grid-template-columns: repeat(5, 1fr);
  z-index: 1;
  overflow-x: auto;
  scrollbar-width: 0;
  scrollbar-height: 0;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: transparent;
  }
`

const ArrowIcon = styled.div`
  display: flex;
  border: 2px solid ${darkColors.backgroundAlt};
  border-radius: 100%;
  width: 30px;
  height: 30px;
  justify-content: center;
  padding-top: 5px;

  &:hover {
    background: ${darkColors.primaryBright};
  }
`

const MenuCard = styled<{ (background) }>(Card)`
  display: flex;
  flex-shrink: 0;
  height: 150px;
  width: 300px;
  background: ${(props) => props.background};
  border: ${(props) => (props.current ? 'none' : `2px solid ${darkColors.background}`)};
  margin: 2px;
  padding: 5px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    border: none;
    & ${ArrowIcon} {
      background: ${darkColors.primaryBright};
    }
  }
`

const ContentRow = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10px;
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: space-between;
`

const MenuItems = [
  {
    id: 2,
    title: 'NovaDEX',
    description:
      'Binance Smart Chain DeFi platform featuring an exchange, farming rewards, P2E 4X game, and a daily MONEY POT that rewards holders with 75% of all fees! NOVADEX is the ONLY place to buy $NOVA!',
    background: "url('/images/home/homeBanner.jpg')",
    backgroundMobile: "url('/images/home/homeBannerMobile.jpg')",
    cardBackground: "url('/images/home/menucard2.jpg')",
    buttonTitle: 'Earn NOVA',
    buttonLink: '/traderoutes',
  },
  {
    id: 1,
    title: 'Legend of Novaria',
    description:
      'Legend of Novaria is a play to earn MMO strategy game built on the Binance Smart Chain and fueled by NOVA. Players can build fleets, mine mineral, fight others in epic space battles, and explore an ENDLESS universe.',
    background: "url('/images/home/homeBanner.jpg')",
    backgroundMobile: "url('/images/home/homeBannerMobile.jpg')",
    cardBackground: "url('/images/home/menucard1.jpg')",
    buttonTitle: 'Play Now',
    buttonLink: '/legend-of-novaria',
  },
]

const SubHero = () => {
  const [currentItem, setCurrentItem] = useState(MenuItems[0].id)
  const [itemCounter, setItemCounter] = useState(0)
  const [announcementText, setAnnouncementText] = useState(MenuItems[0].description)
  const [headerText, setHeaderText] = useState(MenuItems[0].title.toUpperCase())
  const [buttonTitle, setButtonTitle] = useState(MenuItems[0].buttonTitle)
  const [buttonLink, setButtonLink] = useState(MenuItems[0].buttonLink)
  const [bgImg, setBgImg] = useState(MenuItems[0].background)
  const [mobileBgImg, setMobileBgImg] = useState(MenuItems[0].backgroundMobile)

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  useEffect(() => {
    async function switchCard() {
      await sleep(10000)
      if (itemCounter < MenuItems.length - 1) {
        setItemCounter(itemCounter + 1)
      } else {
        setItemCounter(0)
      }
      handleClick(MenuItems[itemCounter])
    }
    switchCard()
  }, [itemCounter])

  const handleClick = (item) => {
    setCurrentItem(item.id)
    setAnnouncementText(item.description)
    setHeaderText(item.title.toUpperCase())
    setButtonTitle(item.buttonTitle)
    setButtonLink(item.buttonLink)
    setBgImg(item.background)
    setMobileBgImg(item.backgroundMobile)
  }

  return (
    <div>
      <Body background={bgImg} mobileBackground={mobileBgImg}>
        <ColLeft>
          <Heading>{headerText}</Heading>
          <Announcement>{announcementText}</Announcement>
          <ButtonRow>
            <NeonButton
              title="Buy NOVA"
              link="https://swap.novadex.finance/#/swap?outputCurrency=0x56E344bE9A7a7A1d27C854628483Efd67c11214F"
            />
            <NeonButton title={buttonTitle} link={buttonLink} />
          </ButtonRow>
        </ColLeft>
      </Body>
      <GridMenu>
        {MenuItems.map((item) => {
          return (
            <MenuCard
              key={item.id}
              gradientBorder
              background={item.cardBackground}
              current={item.id === currentItem}
              onClick={() => handleClick(item)}
            >
              <ContentRow>
                <span>{item.title}</span>
                <ArrowIcon>&gt;</ArrowIcon>
              </ContentRow>
            </MenuCard>
          )
        })}
      </GridMenu>
    </div>
  )
}

export default SubHero
