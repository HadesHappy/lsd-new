import { useState, useEffect } from 'react'
import { useLsdBalance } from './useLsdBalance'
import { useStateInfo } from './useStateInfo'

export const useExchangeRate = () => {
  const { inputToken, outputToken, stakeType, inputValue, outputValue } = useStateInfo()

  const { rate } = useLsdBalance()
  const [exchangeRate, setExchangeRate] = useState()
  
  useEffect(() => {
    if (stakeType === 'STAKE') {
      if (inputToken === 'ETH') {
        setExchangeRate(1 / rate)
      }
      else {
        setExchangeRate(1)
      }
    } else {
      if (inputToken === 'LS-ETH') {
        setExchangeRate(rate)
      }
      else
        setExchangeRate(1)
    }
  }, [stakeType, inputToken, inputValue, outputValue, rate])

  return exchangeRate
}