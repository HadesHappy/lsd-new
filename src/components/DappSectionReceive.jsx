import React, { useState, useEffect } from 'react'
import DappSectionInfo from './DappSectionInfo'
import { useDispatch, useSelector } from 'react-redux'
import { OUTPUT_CHANGE, TRIGGER, INPUTTOKEN, OUTPUTTOKEN, STAKE_TYPE, INPUT_CHANGE } from '../store/constants'
import { usePrice } from '../hooks/usePrice'
import { showBalance, showPrice } from '../utils/common'
import { useExchangeRate } from '../hooks/useExchangeRate'
import { useStateInfo } from '../hooks/useStateInfo'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { lsdTokenLsETH, lsdTokenVeLSD } from '../utils/constants'
import { useBalance } from '@thirdweb-dev/react'
import { useLsdBalance } from '../hooks/useLsdBalance'

import DappDisplayToken from './DappDisplayToken'

const DappSectionReceive = ({ setIsModalVisible }) => {
  const dispatch = useDispatch()
  const { ethPrice } = usePrice()
  const { rate } = useLsdBalance()

  const { inputToken, outputToken, stakeType, inputValue, outputValue } = useStateInfo()
  const exchangeRate = useExchangeRate()
  const [tokenPrice, setTokenPrice] = useState(0)

  const [amount, setAmount] = useState()

  let tokenAddress
  if (outputToken === 'ETH') {
    tokenAddress = NATIVE_TOKEN_ADDRESS
  } else if (outputToken === 'VE-LSD') {
    tokenAddress = lsdTokenVeLSD
  } else {
    tokenAddress = lsdTokenLsETH
  }

  const { data, isLoading } = useBalance(tokenAddress)

  const handleChange = (e) => {
    setAmount(e.target.value)
    dispatch({ type: OUTPUT_CHANGE, payload: e.target.value })
    if (outputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }

  useEffect(() => {
    setAmount(inputValue * exchangeRate)
    if (outputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }, [inputValue])

  useEffect(() => {
    setAmount(0)
    dispatch({ type: INPUT_CHANGE, payload: 0 })
    if (outputToken === 'ETH') {
      setTokenPrice(ethPrice)
    } else {
      setTokenPrice(ethPrice * rate)
    }
  }, [inputToken])

  const handleClick = () => {
    setIsModalVisible(true)
    dispatch({ type: TRIGGER, payload: 'OUTPUT' })
  }

  const handleSwitchClick = () => {

    const dappTabs = document.querySelectorAll('.dapp-section__tab')
    if (dappTabs[0].parentNode.classList.contains('dapp-section__tabs--unstake')) {
      dappTabs[0].parentNode.classList.remove('dapp-section__tabs--unstake')
      dappTabs[0].classList.add('active')
      dappTabs[1].classList.remove('active')
    } else {
      dappTabs[0].parentNode.classList.add('dapp-section__tabs--unstake')
      dappTabs[1].classList.add('active')
      dappTabs[0].classList.remove('active')
    }

    if (stakeType === 'STAKE') {
      dispatch({ type: STAKE_TYPE, payload: 'UNSTAKE' })
    }
    else {
      dispatch({ type: STAKE_TYPE, payload: 'STAKE' })
    }

    const token = inputToken
    dispatch({ type: INPUTTOKEN, payload: outputToken })
    dispatch({ type: OUTPUTTOKEN, payload: token })

    setAmount(0)
  }

  return (
    <div className="dapp-section__receive">
      <button className="dapp-section__receive-swap" onClick={handleSwitchClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <header className="dapp-section__receive-header">
        <p className="dapp-section__receive-title">Receive {outputToken}</p>
        <p className="dapp-section__receive-balance">
          Balance: <span>{showBalance(data?.displayValue)} {outputToken}</span>
        </p>
        <button className="dapp-section__receive-lock">Lock</button>
      </header>
      <div className="dapp-section__receive-actions">
        <input type="number" placeholder="0,000.000000" value={amount || 0} onChange={handleChange} />
        <div className="dapp-section__receive-currency">
          <button
            className="dapp-section__receive-currency-select currency-select"
            onClick={handleClick}
          >
            <DappDisplayToken token={outputToken} />
          </button>
        </div>
      </div>
      <p className="dapp-section__receive-count">${amount * tokenPrice || 0}</p>
      <DappSectionInfo />
    </div>
  )
}

export default DappSectionReceive
