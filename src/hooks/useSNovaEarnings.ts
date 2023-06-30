import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useSNovaEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account }: { account: string } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchSNovaBalances = async () => {
      const calls = farmsConfig
        .filter(
          (farm) =>
            farm.pid === 1 ||
            farm.pid === 2 ||
            farm.pid === 30 ||
            farm.pid === 5 ||
            farm.pid === 7 ||
            farm.pid === 9 ||
            farm.pid === 32 ||
            farm.pid === 10,
        )
        .map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingNova',
          params: [farm.pid, account],
        }))

      // const calls = farmsConfig.map((farm) => ({
      //   address: getMasterChefAddress(),
      //   name: 'pendingNova',
      //   params: [farm.pid, account],
      // }))

      const res = await multicall(masterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchSNovaBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useSNovaEarnings
