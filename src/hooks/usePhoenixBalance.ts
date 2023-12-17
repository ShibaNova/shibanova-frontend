import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import phoenixABI from 'config/abi/phoenix.json'
import novaABI from 'config/abi/nova.json'
import { getContract } from 'utils/web3'
import { getNovaAddress, getPHXAddress, getPhoenixWalletAddress } from 'utils/addressHelpers'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { buyDirect, phxApprove } from 'utils/callHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useRefresh from './useRefresh'
import useWeb3 from './useWeb3'
import { usePhoenix } from './useContract'

const phoenixContract = getContract(phoenixABI, getPHXAddress())
const novaContract = getContract(novaABI, getNovaAddress())

export const usePHXApprove = () => {
  const { account } = useWallet()
  const usePHXContract = usePhoenix()

  const handleApprove = useCallback(
    async (contract) => {
      const txHash = await phxApprove(usePHXApprove, contract, account)
      console.info(txHash)
    },
    [account, usePHXContract],
  )
  return { onPHXApprove: handleApprove }
}

export const useTotalPHXSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalPHXSupply, setTotalPHXSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalPHXSupply() {
      const pHXSupply = await phoenixContract.methods.totalSupply().call()
      setTotalPHXSupply(new BigNumber(pHXSupply))
    }

    fetchTotalPHXSupply()
  }, [slowRefresh])

  return totalPHXSupply
}

export const usePhoenixWalletNova = () => {
  const { slowRefresh } = useRefresh()
  const [phoenixWalletNova, setPhoenixWalletNova] = useState<BigNumber>()

  useEffect(() => {
    async function fetchPhoenixWalletNova() {
      const pwNova = await novaContract.methods.balanceOf(getPhoenixWalletAddress()).call()
      setPhoenixWalletNova(new BigNumber(pwNova))
    }

    fetchPhoenixWalletNova()
  }, [slowRefresh])

  return phoenixWalletNova
}

export const usePhoenixWalletBnb = () => {
  const web3 = useWeb3()
  const { slowRefresh } = useRefresh()
  const [phoenixWalletBnb, setPhoenixWalletBnb] = useState<BigNumber>()

  useEffect(() => {
    async function fetchPhoenixWalletBnb() {
      const pwBnb = await web3.eth.getBalance(getPhoenixWalletAddress())
      setPhoenixWalletBnb(new BigNumber(pwBnb))
    }

    fetchPhoenixWalletBnb()
  }, [slowRefresh, web3.eth])

  return phoenixWalletBnb
}

export const usePhoenixWalletAmt = () => {
  const { slowRefresh } = useRefresh()
  const [phoenixWalletAmt, setPhoenixWalletAmt] = useState<BigNumber>()

  useEffect(() => {
    async function fetchPhoenixWalletAmt() {
      const bal = await phoenixContract.methods.balanceOf(getPhoenixWalletAddress()).call()
      setPhoenixWalletAmt(new BigNumber(bal))
    }

    fetchPhoenixWalletAmt()
  }, [slowRefresh])

  return phoenixWalletAmt
}

export const usePhoenixOffChainBal = () => {
  const { slowRefresh } = useRefresh()
  const [phoenixOffChainBal, setPhoenixOffChainBal] = useState(Number())

  useEffect(() => {
    async function fetchPhoenixOffChainBal() {
      const accountBal = await phoenixContract.methods.getAccountValue().call()
      setPhoenixOffChainBal(accountBal)
    }

    fetchPhoenixOffChainBal()
  }, [slowRefresh])

  return phoenixOffChainBal
}

export const useBuyDirectCost = (amount: number) => {
  const { slowRefresh } = useRefresh()
  const [buyDirectCost, setBuyDirectCost] = useState<BigNumber>()

  useEffect(() => {
    async function fetchBuyDirectCost() {
      const bnbCost = await phoenixContract.methods.getBnbCost(amount).call()
      setBuyDirectCost(new BigNumber(bnbCost))
    }

    fetchBuyDirectCost()
  }, [slowRefresh, amount])

  return getBalanceNumber(buyDirectCost)
}

export const useBuyDirect = () => {
  const { account } = useWallet()
  const usePHXContract = usePhoenix()

  const handleBuy = useCallback(
    async (payable, amount) => {
      const txHash = await buyDirect(usePHXContract, payable, amount, account)
      console.info(txHash)
    },
    [account, usePHXContract],
  )
  return { onBuy: handleBuy }
}
