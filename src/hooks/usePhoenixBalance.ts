import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import phoenixABI from 'config/abi/phoenix.json'
import { getContract } from 'utils/web3'
import { getPHXAddress, getPhoenixWalletAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'
import useWeb3 from './useWeb3'

const phoenixContract = getContract(phoenixABI, getPHXAddress())

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
