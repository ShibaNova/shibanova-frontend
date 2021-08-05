import { ChainId } from '@pancakeswap-libs/sdk'
import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const NOVA_PER_BLOCK = new BigNumber(1)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3
export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
}

export const NOVA_POOL_PID = 1
