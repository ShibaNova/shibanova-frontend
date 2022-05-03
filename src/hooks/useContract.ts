import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getMasterChefAddress,
  getNovaAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMoneyPotAddress,
  getSNovaAddress,
  getMoneyPotOldAddress,
  getFleetAddress,
  getMapAddress,
  getApprovalsAddress,
  getReferralsAddress,
  getTreasuryAddress
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
import fleet from 'config/abi/Fleet.json'
import referrals from 'config/abi/Referrals.json'
import map from 'config/abi/Map.json'
import approvals from 'config/abi/Approvals.json'
import treasury from 'config/abi/Treasury.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
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

export const useFleet = () => {
  const fleetABI = fleet as unknown as AbiItem
  return useContract(fleetABI, getFleetAddress())
}

export const useMap = () => {
  const mapABI = map as unknown as AbiItem
  return useContract(mapABI, getMapAddress())
}

export const useApprovals = () => {
  const approvalsABI = approvals as unknown as AbiItem
  return useContract(approvalsABI, getApprovalsAddress())
}

export const useReferrals = () => {
  const referralsABI = referrals as unknown as AbiItem
  return useContract(referralsABI, getReferralsAddress())
}

export const useTreasury = () => {
  const treasuryABI = treasury as unknown as AbiItem
  return useContract(treasuryABI, getTreasuryAddress())
}

export default useContract
