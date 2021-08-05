import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'NOVA',
    lpAddresses: {
      97: '0xc86008fb885619cb8bafc6c7a97d99e4928f0145',
      56: '0xDb2B70a73C587513089DaAB4d38Ff6f35dA5eD63',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xDb2B70a73C587513089DaAB4d38Ff6f35dA5eD63',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'NOVA-BUSD LP',
    lpAddresses: {
      97: '0xc86008fb885619cb8bafc6c7a97d99e4928f0145',
      56: '0x52157699bA2b3bCEF0E91aa6bF56680672810964',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xDb2B70a73C587513089DaAB4d38Ff6f35dA5eD63',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'NOVA-BNB LP',
    lpAddresses: {
      97: '0x429008d0fe2725c68715d5db13a67f038c501fff',
      56: '0x6534cA773018203f6774503d6A7Cd530f9CC4EA3',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xDb2B70a73C587513089DaAB4d38Ff6f35dA5eD63',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xa39352142b1f8f9FD43DEB307fbABb05FeC195B6',
      56: '0xe20E810Cbe229E9AbAd210adfFF59B1EB723acEa',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
