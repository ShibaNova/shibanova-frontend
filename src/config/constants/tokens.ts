import { ChainId, Token } from '@pancakeswap-libs/sdk'

export const NOVA = new Token(
  ChainId.MAINNET,
  '0xDb2B70a73C587513089DaAB4d38Ff6f35dA5eD63',
  18,
  'NOVA',
  'ShibaNova Token',
)

export const DAI = new Token(ChainId.MAINNET, '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Tether USD')
export const ETH = new Token(ChainId.MAINNET, '0x2170ed0880ac9a755fd29b2688956bd959f933f8', 18, 'ETH', 'Ethereum Token')
export const WBNB = new Token(ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB')
export const BTCB = new Token(
  ChainId.MAINNET,
  '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  18,
  'BTCB',
  'Binance-Peg BTCB Token',
)

export const USDC = new Token(
  ChainId.MAINNET,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
)
