import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const NOVA_PER_BLOCK = new BigNumber(1)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3

export const NOVA_POOL_PID = 0
export const BATTLE_COOLDOWN = 60 * 60 * 24
export const TIME_MODIFIER = 1
