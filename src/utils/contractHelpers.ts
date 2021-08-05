import { ethers } from 'ethers'
// Addresses
import {
  getNovaAddress,
  getSNovaAddress,
  getMasterChefAddress,
  getMulticallAddress,
  getMoneyPotAddress,
} from 'utils/addressHelpers'
// ABI
import bep20Abi from 'config/abi/erc20.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import novaAbi from 'config/abi/nova.json'
import sNovaAbi from 'config/abi/snova.json'
import masterChefAbi from 'config/abi/masterchef.json'
import multiCallAbi from 'config/abi/multicall.json'
import moneypotAbi from 'config/abi/moneypot.json'
import { simpleRpcProvider } from './providers'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getNOVAContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(sNovaAbi, getNovaAddress(), signer)
}
export const getSNOVAContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(novaAbi, getSNovaAddress(), signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChefAbi, getMasterChefAddress(), signer)
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(multiCallAbi, getMulticallAddress(), signer)
}
export const getMoneypotContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(moneypotAbi, getMoneyPotAddress(), signer)
}
