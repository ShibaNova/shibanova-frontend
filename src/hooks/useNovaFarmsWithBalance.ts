import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const useNovaFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const notSNovaFarms = farmsConfig.filter(
        (farm) =>
          farm.pid !== 1 &&
          farm.pid !== 2 &&
          farm.pid !== 5 &&
          farm.pid !== 7 &&
          farm.pid !== 9 &&
          farm.pid !== 10 &&
          farm.pid !== 30 &&
          farm.pid !== 32,
      )

      const calls = notSNovaFarms.map((farm) => ({
        address: getMasterChefAddress(),
        name: 'pendingNova',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterChefABI, calls)
      const results = notSNovaFarms.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useNovaFarmsWithBalance
