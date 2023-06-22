import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import novaABI from 'config/abi/nova.json'
import sNovaABI from 'config/abi/snova.json'
import moneypotABI from 'config/abi/moneypot.json'
import moneypotoldABI from 'config/abi/moneypotold.json'
import wethABI from 'config/abi/weth.json'
import { getContract } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import {
  getNovaAddress,
  getSNovaAddress,
  getMoneyPotAddress,
  getBusdAddress,
  getWbnbAddress,
} from 'utils/addressHelpers'
import useRefresh from './useRefresh'

const novaContract = getContract(novaABI, getNovaAddress())

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await novaContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useNovaBurnSupply = () => {
  const { slowRefresh } = useRefresh()
  const [novaBurnSupply, setNovaBurnSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchNovaBurnSupply() {
      const supply = await novaContract.methods.burnSupply().call()
      setNovaBurnSupply(new BigNumber(supply))
    }

    fetchNovaBurnSupply()
  }, [slowRefresh])

  return novaBurnSupply
}

export const useSNovaBurnSupply = () => {
  const { slowRefresh } = useRefresh()
  const [sNovaBurnSupply, setSNovaBurnSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchSNovaBurnSupply() {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const supply = await sNovaContract.methods.burnSupply().call()
      setSNovaBurnSupply(new BigNumber(supply))
    }

    fetchSNovaBurnSupply()
  }, [slowRefresh])

  return sNovaBurnSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const bal = await novaContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useSNovaTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const supply = await sNovaContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useSNovaBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const bal = await sNovaContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useNextMoneyPot = () => {
  const { slowRefresh } = useRefresh()
  const [nextMoneyPot, setNextMoneyPot] = useState<BigNumber>()

  useEffect(() => {
    async function fetchNextMoneyPot() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const blockNumber = await moneyPotContract.methods.nextMoneyPotUpdateBlock().call()
      setNextMoneyPot(new BigNumber(blockNumber))
    }

    fetchNextMoneyPot()
  }, [slowRefresh])

  return nextMoneyPot
}

export const useMoneyPotBNBReward = () => {
  const { slowRefresh } = useRefresh()
  const [moneyPotBNBReward, setMoneyPotBNBReward] = useState<BigNumber>()
  const { account }: { account: string } = useWallet()
  const bnbAddress = getWbnbAddress()
  let user

  if (account === null || account === undefined || account === '') {
    user = '0x0000000000000000000000000000000000000000'
  } else {
    user = account
  }

  useEffect(() => {
    async function fetchMoneyPotBNBReward() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const reward = await moneyPotContract.methods.pendingTokenRewardsAmount(bnbAddress, user).call()
      setMoneyPotBNBReward(new BigNumber(reward))
    }

    fetchMoneyPotBNBReward()
  }, [bnbAddress, user, slowRefresh])

  return moneyPotBNBReward
}

export const useMoneyPotBUSDReward = () => {
  const { slowRefresh } = useRefresh()
  const [moneyPotBUSDReward, setMoneyPotBUSDReward] = useState<BigNumber>()
  const { account }: { account: string } = useWallet()
  const busdAddress = getBusdAddress()
  let user

  if (account === null || account === undefined || account === '') {
    user = '0x0000000000000000000000000000000000000000'
  } else {
    user = account
  }

  useEffect(() => {
    async function fetchMoneyPotBUSDReward() {
      const moneyPotContract = getContract(moneypotoldABI, getMoneyPotAddress())
      const reward = await moneyPotContract.methods.pendingTokenRewardsAmount(busdAddress, user).call()
      setMoneyPotBUSDReward(new BigNumber(reward))
    }

    fetchMoneyPotBUSDReward()
  }, [busdAddress, user, slowRefresh])

  return moneyPotBUSDReward
}

export const useSNovaPenalty = () => {
  const { slowRefresh } = useRefresh()
  const [SNovaPenalty, setSNovaPenalty] = useState<BigNumber>()
  const { account }: { account: string } = useWallet()
  let user

  if (account === null || account === undefined || account === '') {
    user = '0x0000000000000000000000000000000000000000'
  } else {
    user = account
  }

  useEffect(() => {
    async function fetchSNovaPenalty() {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const penalty = await sNovaContract.methods.getPenaltyPercent(user).call()

      setSNovaPenalty(penalty)
    }

    fetchSNovaPenalty()
  }, [user, slowRefresh])

  return SNovaPenalty
}

export const useDistributedMoneyPotBUSD = () => {
  const { slowRefresh } = useRefresh()
  const [distributedMoneyPotBUSD, setDistributedMoneyPotBUSD] = useState<Array<any>>([])
  const busdAddress = getBusdAddress()

  useEffect(() => {
    async function fetchMoneyPotDistributedMoneyPotBUSD() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const disMoneyPotBusd = await moneyPotContract.methods.distributedMoneyPot(busdAddress).call()

      setDistributedMoneyPotBUSD(disMoneyPotBusd)
    }

    fetchMoneyPotDistributedMoneyPotBUSD()
  }, [busdAddress, slowRefresh])

  return distributedMoneyPotBUSD
}

export const useDistributedMoneyPotBNB = () => {
  const { slowRefresh } = useRefresh()
  const [distributedMoneyPotWBNB, setDistributedMoneyPotWBNB] = useState<Array<any>>([])
  const wbnbAddress = getWbnbAddress()

  useEffect(() => {
    async function fetchMoneyPotDistributedMoneyPotBUSD() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const disMoneyPotWbnb = await moneyPotContract.methods.distributedMoneyPot(wbnbAddress).call()
      setDistributedMoneyPotWBNB(disMoneyPotWbnb)
    }

    fetchMoneyPotDistributedMoneyPotBUSD()
  }, [wbnbAddress, slowRefresh])

  return distributedMoneyPotWBNB
}

export const useTotalMoneyPotBNB = () => {
  const { slowRefresh } = useRefresh()
  const [totalMoneyPotWBNB, setTotalMoneyPotWBNB] = useState<Array<any>>([])
  const wbnbAddress = getWbnbAddress()

  useEffect(() => {
    async function wbnbTransfers() {
      const moneyPot = getMoneyPotAddress()
      const wbnbContract = getContract(wethABI, wbnbAddress)
      const totalMoneyPotWbnb = await wbnbContract.getPastEvents('Transfer', {
        filter: { dst: [moneyPot] },
        fromBlock: 9790136,
        toBlock: 'latest',
      })
      setTotalMoneyPotWBNB(totalMoneyPotWbnb)
    }

    wbnbTransfers()
  }, [wbnbAddress, slowRefresh])

  return totalMoneyPotWBNB
}

export default useTokenBalance
