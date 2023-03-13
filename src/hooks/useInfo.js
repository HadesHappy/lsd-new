import { getOwnerContract } from "../contracts"
import { useState, useEffect } from 'react'

export const useInfo = () => {
  const [apr, setApr] = useState()
  const [aprUnit, setAprUnit] = useState()
  const [lidoApr, setLidoApr] = useState()
  const [rpApr, setRpApr] = useState()
  const [swiseApr, setSwiseApr] = useState()
  const [minimum, setMinimum] = useState()
  const [enabled, setEnabled] = useState()
  const [multiplier, setMultiplier] = useState()
  const [multiplierUnit, setMultiplierUnit] = useState()
  const [owner, setOwner] = useState()
  const [isLock, setIsLock] = useState()

  const setInfos = async () => {
    try {
      const { apr, rpApr, lidoApr, aprUnit, multiplier, multiplierUnit, depositEnabled, isLock, minimumAmount, owner } = await getOwnerContract()
      setApr(apr)
      setAprUnit(aprUnit)
      setRpApr(rpApr)
      setLidoApr(lidoApr)
      setSwiseApr(swiseApr)
      setMinimum(minimumAmount)
      setEnabled(depositEnabled)
      setIsLock(isLock)
      setMultiplier(multiplier)
      setMultiplierUnit(multiplierUnit)
      setOwner(owner)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setInfos()
  }, [])

  return { apr, setApr, rpApr, setRpApr, lidoApr, setLidoApr, aprUnit, setAprUnit, minimum, setMinimum, enabled, setEnabled, multiplier, setMultiplier, multiplierUnit, setMultiplierUnit, owner, isLock, setIsLock }
}