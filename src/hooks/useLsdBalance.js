import { useState, useEffect } from 'react'
import { getTokenLsETHContract, getTokenVeLSDContract, getUpdateBalanceContract } from "../contracts";

export const useLsdBalance = () => {
  const [stakedETH, setStakedETH] = useState()
  const [lsEthSupply, setLsEthSupply] = useState()
  const [veLsdSupply, setVelsdSupply] = useState()
  const [rate, setRate] = useState()

  const getStakedETHAmount = async () => {
    try {
      const amount = await getUpdateBalanceContract()
      setStakedETH(amount)
    } catch (error) {
      console.log(error)
    }
  }

  const getLsETHSupply = async () => {
    try {
      const {exchangeRate, totalSupply} = await getTokenLsETHContract()

      setLsEthSupply(totalSupply)
      setRate(exchangeRate)
    } catch (error) {
      console.log(error)
    }
  }

  const getVeLSDSupply = async () => {
    try {
      const amount = await getTokenVeLSDContract()
      setVelsdSupply(amount)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStakedETHAmount()
    getLsETHSupply()
    getVeLSDSupply()
  }, [])

  return { stakedETH, lsEthSupply, veLsdSupply, rate, setRate }
}
