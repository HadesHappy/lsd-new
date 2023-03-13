import { useState, useEffect } from 'react'

export const useMetamaskStatus = () => {
  const [isMetamaskInstalled, setIsmetamaskinstalled] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      // check if Metamask wallet is installed
      setIsmetamaskinstalled(true)
    }
  }, [])

  return { isMetamaskInstalled }
}