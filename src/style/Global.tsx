import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { ShibanovaTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ShibanovaTheme {}
}
const spacebgMobile = "url('/images/home/bgspaceMobile.jpg')"
const novariaMobileBG = "url('/images/home/novariaBGMobile.jpg')"
const novariaBG = "url('/images/home/mainBackground-dark.jpg')"
const spaceBG = "url('/images/home/bgspaceBig.jpg')"
const novariaSpace = "url('/images/novaria/mapBG.jpg')"
const novariaSpaceMobile = "url('/images/novaria/starsbg_portrait.png')"
const novariaShipyard = "url('/images/novaria/shipyardBG.jpg')"

const GlobalStyle = createGlobalStyle<{
  isNovaria: boolean
  isNovariaSpace: boolean
  isShipyard: boolean
  isStandard: boolean
}>`
// @font-face {
//   font-family: 'BigNoodle';
//   src:  url('./fonts/bignoodletitling.woff') format('woff'), url('./fonts/bignoodletitling.ttf') format('truetype');
// }
  * {
    // font-family: 'Montserrat', sans-serif;
    font-family: 'Poppins', sans-serif;
    // font-family: 'BigNoodle';
  }
  body {
     background: ${({ isNovaria }) => (isNovaria ? ({ theme }) => theme.colors.background : '')};
     background: ${({ isStandard }) => (isStandard ? ({ theme }) => theme.colors.background : '')};
     background-image: ${({ isNovariaSpace }) => (isNovariaSpace ? novariaSpaceMobile : '')};
     background-image: ${({ isShipyard }) => (isShipyard ? novariaShipyard : '')};

     background-size: ${({ isNovaria, isShipyard, isNovariaSpace }) =>
       isNovaria || isShipyard || isNovariaSpace ? 'cover' : '100% auto'};
     background-repeat: repeat-y;
     background-position: center;

     margin: 0 10px;

    img {
      height: auto;
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.md} {
      background: ${({ isNovaria }) => (isNovaria ? ({ theme }) => theme.colors.background : '')};
      background: ${({ isStandard }) => (isStandard ? ({ theme }) => theme.colors.background : '')};
      background-image: ${({ isNovariaSpace }) => (isNovariaSpace ? novariaSpace : '')};
      background-image: ${({ isShipyard }) => (isShipyard ? novariaShipyard : '')};
      
      background-size: ${({ isNovaria, isShipyard, isNovariaSpace }) =>
        isNovaria || isShipyard || isNovariaSpace ? 'cover' : '100% auto'};
      background-repeat: ${({ isNovaria }) => (isNovaria ? 'none' : 'repeat-y')};
      background-position: center;
    }

    .glow-on-hover {
      font-size: 0.75rem;
      font-weight: bold;
      margin: 0 0 12px 0px;
      width: 187px;
      height: 20px;
      border: none;
      outline: none;
      color: #000;
      cursor: pointer;
      position: relative;
      z-index: 0;
      border-radius: 0px;
      background-color: #ffd700;
  }
  
  .glow-on-hover:before {
      content: '';
      background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
      position: absolute;
      top: -2px;
      left:-2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      border-radius: 0px;
  }
  
  .glow-on-hover:active {
      color: #000
  }
  
  .glow-on-hover:active:after {
      background: transparent;
  }
  
  .glow-on-hover:hover:before {
      opacity: 1;
  }
  
  .glow-on-hover:after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #5affff;
      border-radius:0 px;
      border: 2px solid #ffd700;
      left: 0;
      top: 0;
  }
    
    @keyframes glowing {
        0% { background-position: 0 0; }
        50% { background-position: 400% 0; }
        100% { background-position: 0 0; }
    }

    @keyframes gradientBackground {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`

export default GlobalStyle
