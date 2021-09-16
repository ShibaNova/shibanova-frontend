import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getNovaAddress = () => {
  return addresses.nova[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getSNovaAddress = () => {
  return addresses.snova[chainId]
}
export const getMoneyPotAddress = () => {
  return addresses.moneyPot[chainId]
}
export const getMoneyPotOldAddress = () => {
  return addresses.moneyPotOld[chainId]
}
export const getBusdAddress = () => {
  return addresses.busd[chainId]
}
