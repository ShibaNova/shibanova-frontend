import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useMulticallContract } from './useContract'
import ERC20_INTERFACE from '../constants/abis/erc20'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}
const priceContracts: { novaAddress: string; busdAddress: string; lpAddress: string } = {
  novaAddress: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
  busdAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  lpAddress: '0x9d6fde3bd9e1cc21da6d6c606343bc9164509cb6',
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/shibanovaswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.shibanovaswap.com/api/v1/price'

const useGetPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (multicallContract) {
          const { novaAddress, busdAddress, lpAddress } = priceContracts
          const calls = [
            [novaAddress, ERC20_INTERFACE.encodeFunctionData('balanceOf', [lpAddress])],
            [busdAddress, ERC20_INTERFACE.encodeFunctionData('balanceOf', [lpAddress])],
          ]

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls)
          const [novaAmount, busdAmount] = result.map((r) => ERC20_INTERFACE.decodeFunctionResult('balanceOf', r))
          const nova = new BigNumber(novaAmount)
          const busd = new BigNumber(busdAmount)
          const novaPrice = busd.div(nova).toNumber()
          setData(novaPrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export default useGetPriceData
