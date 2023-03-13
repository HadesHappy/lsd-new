import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const defualtState = {
  wallet: '',
  setAddress() { },
}

export const AccountContext = createContext(defualtState)
export const useAccountContext = () => useContext(AccountContext)

const AccountProvider = ({children}) => {
  const [wallet, setWallet] = useState()
  const { getItem, setItem } = useLocalStorage()

  const setAddress = (address) => {
    setItem('address', address)
    setWallet(address)
  }

  useEffect(() => {
    const value = getItem('address')
    if (value)
      setAddress(value)
  }, [])

  return(
    <AccountContext.Provider
    value={{
      wallet,
      setAddress,
    }}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider