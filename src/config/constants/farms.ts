import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 27,
    risk: 4,
    lpSymbol: 'PHX-NOVA LP',
    lpAddresses: {
      56: '0xe283b646891AF96b003DB63c272520fDa3b66057',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      56: '0x0F925153230C836761F294eA0d81Cef58E271Fb7',
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
      56: '0x9d6fDE3Bd9e1Cc21da6D6c606343BC9164509Cb6',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
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
      56: '0xfB240baf7b6308D8Ba56Bf6a181fA8AbC39a1df1',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 7,
    risk: 2,
    lpSymbol: 'NOVA-BTCB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xA673a0a4eAbCD5850d945B0fd7CedEf60F80ad44',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 5,
    risk: 1,
    lpSymbol: 'NOVA-ETH LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xca332c918c78e8879d377fc97a7ccf103fc6aedd',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 9,
    risk: 1,
    lpSymbol: 'NOVA-MATIC LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x858522e9023E5c2cacb6C13C0cEbd63ff763a10f',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 10,
    risk: 1,
    lpSymbol: 'NOVA-CAKE LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x9E3659d2a4AC2FD9A9B0424df10b956DD99A07a4',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'NOVA',
    lpAddresses: {
      97: '0xc86008fb885619cb8bafc6c7a97d99e4928f0145',
      56: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
    },
    tokenSymbol: 'NOVA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 28,
    risk: 19,
    lpSymbol: 'RYOSHI-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x1a25b6fc13bd8bcf2d01759f650ff44962227a61',
    },
    tokenSymbol: 'RYOSHI',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x0e5f989ce525acc4ee45506af91964f7f4c9f2e9',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 30,
    risk: 19,
    lpSymbol: 'ETERNAL-NOVA LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xEFd70fee6A55c8A8641554c7FEb5A216A3cb645D',
    },
    tokenSymbol: 'ETERNAL',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xd44fd09d74cd13838f137b590497595d6b3feea4',
    },
    quoteTokenSymbol: QuoteToken.NOVA,
    quoteTokenAdresses: contracts.nova,
  },
  {
    pid: 29,
    risk: 19,
    lpSymbol: 'ETERNAL-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x6B6A170dA0713187DE61547F3807703735c5b01f',
    },
    tokenSymbol: 'ETERNAL',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xd44fd09d74cd13838f137b590497595d6b3feea4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 27,
    risk: 20,
    lpSymbol: 'TOON-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x269Da62384B9D104E39760F142dB7D066a50FB38',
    },
    tokenSymbol: 'TOON',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xca695a939203a9445113b90aa188b81ed1772970',
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
  {
    pid: 18,
    risk: 4,
    lpSymbol: 'DAI-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x3d40E6de751b264c4328C11f17Ab5448A519AC36',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 8,
    risk: 2,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xb21e5fedbd23e36a273dc3521bbb5d6e0bc43b0b',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    risk: 2,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x092ecdebed7270fcce414ccfb24b69829610f5aa',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 19,
    risk: 4,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x05a551ddFDdBF11cf929D40a9075812b5E768E93',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 11,
    risk: 1,
    lpSymbol: 'MATIC-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x6264a3eac2d0beb3de1c930a9068c956391a50ad',
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 12,
    risk: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x5f2ba7c2c53df850c0fe017bf618b0550f0998aa',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 4,
    risk: 1,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xbcd0e7a54a2a629595e7098989de5cb9516877a5',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 13,
    risk: 1,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xbcd0e7a54a2a629595e7098989de5cb9516877a5',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 20,
    risk: 4,
    lpSymbol: 'ETH-BUSD LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xb0Eff53a988da9e80F377f14E42afc4bec587497',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 17,
    risk: 3,
    lpSymbol: 'ETH-BTCB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x09aafBFA1DBdf5A1dA7aeF876e54B112Af0a0B11',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 22,
    risk: 4,
    lpSymbol: 'USDC-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x0dd91f6d98b01bcd3e04c28fb1acb20f0be8f40d',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 21,
    risk: 4,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xb5977360D86a584435F1eEfEC070F3E9aEF29407',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 23,
    risk: 4,
    lpSymbol: 'USDT-USDC LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x4dAccee3E4a7352fD853Cfb92C9cCE6A7681B18D',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 14,
    risk: 1,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xF45936B04E81258a289D6bFE1B176D7FdD483bA0',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 16,
    risk: 1,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xAFe738BD826c124575C6C7e93a7288ff61766733',
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 15,
    risk: 1,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x263a7acd41eec4234be833d20a223fd6684bf568',
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 24,
    risk: 4,
    lpSymbol: 'LINK-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xbfd45e558d9221d416bcf3b5a767dfe7f109007d',
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 25,
    risk: 4,
    lpSymbol: 'CRUDE-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x80aacfA71E27bF8198652C94bBa03cd01C41Af92',
    },
    tokenSymbol: 'CRUDE',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x8db702d9d561921c45be8df38830a653e4bc0299',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 26,
    risk: 4,
    lpSymbol: 'JAWS-BNB LP',
    lpAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0x186c1c8b3f5297319afa9ecee69579f2ddcf25fe',
    },
    tokenSymbol: 'JAWS',
    tokenAddresses: {
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
      56: '0xdd97ab35e3c0820215bc85a395e13671d84ccba2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
