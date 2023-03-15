import { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateInfo } from './useStateInfo'

export const usePrice = () => {
  const [ethPrice, setEthPrice] = useState()
  const [lsdPrice, setLsdPrice] = useState()

  const { inputValue, outputValue } = useStateInfo()

  // "https://api.binance.com/api/v3/ticker/price?symbol=ETHBUSD"
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      .then((res) => {
        if (res.data) {
          setEthPrice(res.data.ethereum.usd)
        } else {
          console.log('no data')
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=liquid-staking-derivative&vs_currencies=usd").then((res) => {
      if (res.data) {
        setLsdPrice(res.data["liquid-staking-derivative"].usd)
      } else {
        console.log('no data')
      }
    }
    )
      .catch((error) => {
        console.log(error)
      })
  }, [inputValue, outputValue])

  return { ethPrice, lsdPrice }
}

