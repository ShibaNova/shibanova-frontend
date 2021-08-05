import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync } from 'state/actions'
import { unstake, swapToNova } from 'utils/callHelpers'
import { useMasterchef, useSNOVA } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useSwapToNova = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sNovaContract = useSNOVA()

  const handleSwapToNova = useCallback(
    async (amount: string) => {
      const txHash = await swapToNova(sNovaContract, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, sNovaContract],
  )

  return { onUnstake: handleSwapToNova }
}

export default useUnstake
