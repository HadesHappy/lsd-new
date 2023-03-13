import { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateInfo } from './useStateInfo'

export const usePrice = () => {
  const [ethPrice, setEthPrice] = useState()
  const { inputValue, outputValue } = useStateInfo()

  useEffect(() => {
    axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHBUSD")
      .then((res) => {
        if (res.data) {
          setEthPrice(res.data.price)
        } else {
          console.log('no data')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [inputValue, outputValue])

  return { ethPrice }
}

