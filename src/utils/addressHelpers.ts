import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

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
export const getSNovaAddress = () => {
  return addresses.snova[chainId]
}
export const getMoneyPotAddress = () => {
  return addresses.moneyPot[chainId]
}
export const getBusdAddress = () => {
  return addresses.busd[chainId]
}
