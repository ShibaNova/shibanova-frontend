import { defaultContracts, turboContracts } from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getNovaAddress = () => {
  return defaultContracts.nova[chainId]
}
export const getMasterChefAddress = () => {
  return defaultContracts.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return defaultContracts.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return defaultContracts.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return defaultContracts.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return defaultContracts.lotteryNFT[chainId]
}
export const getSNovaAddress = () => {
  return defaultContracts.snova[chainId]
}
export const getMoneyPotAddress = () => {
  return defaultContracts.moneyPot[chainId]
}
export const getMoneyPotOldAddress = () => {
  return defaultContracts.moneyPotOld[chainId]
}
export const getBusdAddress = () => {
  return defaultContracts.busd[chainId]
}
export const getMapAddress = (turbo: boolean) => {
  const contracts = turbo ? turboContracts : defaultContracts
  return contracts.map[chainId]
}
export const getFleetAddress = (turbo: boolean) => {
  const contracts = turbo ? turboContracts : defaultContracts
  return contracts.fleet[chainId]
}
export const getApprovalsAddress = () => {
  return defaultContracts.approvals[chainId]
}
export const getTreasuryAddress = (turbo: boolean) => {
  const contracts = turbo ? turboContracts : defaultContracts
  return contracts.treasury[chainId]
}
export const getReferralsAddress = (turbo: boolean) => {
  const contracts = turbo ? turboContracts : defaultContracts
  return contracts.referrals[chainId]
}
