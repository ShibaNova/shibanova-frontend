import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getMasterChefAddress, getSnovaFarms } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useNovaEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account }: { account: string } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchNovaBalances = async () => {
      const calls = farmsConfig
        .filter((farm) => !getSnovaFarms().includes(farm.pid))
        .map((farm) => ({
          address: getMasterChefAddress(),
          name: 'pendingNova',
          params: [farm.pid, account],
        }))

      const res = await multicall(masterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchNovaBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useNovaEarnings
