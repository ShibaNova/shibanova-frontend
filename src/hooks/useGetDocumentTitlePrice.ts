import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData'
import { NOVA } from '../constants'

const useGetDocumentTitlePrice = () => {
  const novaPriceUsd = useGetPriceData()
  // const novaPriceUsd = (priceData && priceData.data) ? parseFloat(priceData.data[NOVA.address].price) : 0

  const novaPriceUsdString =
    Number.isNaN(novaPriceUsd) || novaPriceUsd === 0
      ? ''
      : ` - $${novaPriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `ShibaNova${novaPriceUsdString}`
  }, [novaPriceUsdString])
}
export default useGetDocumentTitlePrice
