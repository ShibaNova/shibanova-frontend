import { useEffect, useState, useMemo } from 'react'
import { AbiItem } from 'web3-utils'
import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '@becoswap-libs/sdk'
import { ContractOptions } from 'web3-eth-contract'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useWeb3 from 'hooks/useWeb3'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import {
  getMasterChefAddress,
  getNovaAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMoneyPotAddress,
  getSNovaAddress,
  getMoneyPotOldAddress
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import moneyPot from 'config/abi/moneypot.json'
import sNova from 'config/abi/snova.json'
import ERC20_ABI from '../constants/abis/erc20.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'

// returns null on errors
function useContract2(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract2(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract2(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract2(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.BSCTESTNET:
    }
  }
  return useContract2(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract2(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract2(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract2(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}



/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = ifo as unknown as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = erc20 as unknown as AbiItem
  return useContract(erc20Abi, address)
}

export const useNova = () => {
  return useERC20(getNovaAddress())
}

export const useRabbitMintingFarm = (address: string) => {
  const rabbitMintingFarmAbi = rabbitmintingfarm as unknown as AbiItem
  return useContract(rabbitMintingFarmAbi, address)
}

export const useLottery = () => {
  const abi = lottery as unknown as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = lotteryTicket as unknown as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = masterChef as unknown as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = rawAbi as unknown as AbiItem
  return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export const useMoneyPot = () => {
  const moneyPotAbi = moneyPot as unknown as AbiItem
  return useContract(moneyPotAbi, getMoneyPotAddress())
}

export const useMoneyPotOld = () => {
  const moneyPotOldAbi = moneyPot as unknown as AbiItem
  return useContract(moneyPotOldAbi, getMoneyPotOldAddress())
}

export const useSNova = () => {
  const sNovaAbi = sNova as unknown as AbiItem
  return useContract(sNovaAbi, getSNovaAddress())
}

export default useContract
